require('dotenv').config();
require('dotenv').config({ path: '.env.local', debug: true });
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const apiRoutes = require('./apiRoutes');
const getStaticFilePath = require('./utils/getStaticFilePath');
const dbSeed = require('./fixtures/dbSeed');
const Shop = require('./resources/Shop');
const mailer = require('./resources/Mailer');

const runServer = async () => {
  // Connect to DB
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.MONGO_CONN_STR);

  // Seed db if required
  await dbSeed();

  // Configure SMTP
  const shop = await new Shop().loadBy({});
  mailer.configure({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    sender: `"${shop.attributes.name}" <${shop.attributes.email}>`,
  });

  // Create an express app instance we can use to attach middleware and HTTP routes
  const app = express();

  // Use CORS middleware so we can make requests across origins
  app.use(cors());

  // Use gzip/deflate compression middleware
  app.use(compression());

  // JSON request body parsing
  app.use(express.json({ limit: '50MB' }));

  /**
   * API ROUTES
   */
  app.use('/api', apiRoutes);

  /**
   * Static assets
   */
  app.use((req, res, next) => {
    const rootPath = path.join(__dirname, '../../../');
    const toServe = getStaticFilePath({ req, rootPath });
    if (!fs.existsSync(toServe)) {
      res.status(404).send('error: Asset not found');
      return;
    }

    // Serve the file
    res.sendFile(toServe);
  });

  /**
   * General error handling
   */
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // If no specific error was given, default it
    const status = err.status || 500;
    const message = err.message || 'unable to process request';

    // If this is a server error, log it to console
    if (status > 499) {
      // eslint-disable-next-line no-console
      console.log('Application error', err);
    }

    res.status(status).send(`Error: ${message}`);
  });

  /**
   * Heroku will only allow us to listen on a single port,
   * and it will tell us which one it is with the PORT env var
   */
  const port = parseInt(process.env.PORT ?? 8080, 10);
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API/CDN server is listening on ${port}`);
  });
};

module.exports = runServer;

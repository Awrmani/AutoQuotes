const express = require('express');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');
const routes = require('./routes');
const { strategyFactory } = require('../utils/authentication');

const apiServer = () => {
  // Create an express app instance we can use to attach middleware and HTTP routes
  const app = express();

  // Use CORS middleware so we can make requests across origins
  app.use(cors());

  // Use gzip/deflate compression middleware
  app.use(compression());

  // JSON request body parsing
  app.use(express.json());

  // Set up our passport authorization middleware
  passport.use('enduser', strategyFactory({ audience: 'enduser' }));
  passport.use('shop', strategyFactory({ audience: 'shop' }));
  app.use(passport.initialize());

  /**
   * API ROUTES
   */
  app.use('/', routes);

  /**
   * ERROR HANDLING
   */
  // Handle no route found
  app.use((req, res) => {
    res.status(404).json({ error: 'No such route was found' });
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

    res.status(status).json({ error: message });
  });

  app.listen(8080, () => {
    // eslint-disable-next-line no-console
    console.log(`API is listening on 8080`);
  });
};

module.exports = apiServer;

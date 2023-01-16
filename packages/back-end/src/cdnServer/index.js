const express = require('express');
const compression = require('compression');

const cdnServer = () => {
  // Create an express app instance we can use to attach middleware and HTTP routes
  const app = express();

  // Use gzip/deflate compression middleware
  app.use(compression());

  /**
   * Static assets
   *
   * TODO
   */

  /**
   * ERROR HANDLING
   */

  // Handle no route found
  app.use((req, res) => {
    res.status(404).send('error: Asset not found');
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
      console.log('CDN error', err);
    }

    res.status(status).send(`error: ${message}`);
  });

  // Get the desired port from the process environment. Default to `80`
  const port = parseInt(process.env.CDN_PORT || 80, 10);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`CDN is listening on ${port}`);
  });
};

module.exports = cdnServer;

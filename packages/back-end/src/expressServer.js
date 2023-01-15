const express = require('express');
const cors = require('cors');
const compression = require('compression');
// const passport = require('passport');

const expressServer = () => {
  // Create an express app instance we can use to attach middleware and HTTP routes
  const app = express();

  // Use CORS middleware so we can make requests across origins
  app.use(cors());

  // Use gzip/deflate compression middleware
  app.use(compression());

  // Set up our passport authorization middleware
  // TODO JWT code
  // passport.use(authorization.strategy());
  // app.use(passport.initialize());

  /**
   * Static assets
   *
   * TODO
   */

  /**
   * API ROUTES
   *
   * TODO
   */
  // app.use('/api/v1', routes);

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

  // Get the desired port from the process environment. Default to `8080`
  const port = parseInt(process.env.API_PORT || 8080, 10);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server  is listening on ${port}`);
  });
};

module.exports = expressServer;

const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

const cdnServer = () => {
  // Create an express app instance we can use to attach middleware and HTTP routes
  const app = express();

  // Use gzip/deflate compression middleware
  app.use(compression());

  /**
   * This function takes the request object and returns
   * the file that should be served to the browser based on the
   * request pathname and the "host" request header
   */
  const getServedFile = req => {
    const { host } = req.headers ?? {};
    let { pathname } = new URL(req.originalUrl, 'http://dummy.com');
    pathname = pathname.replaceAll('..', '.'); // Do not serve paths outside of the bundle
    const basename = path.basename(pathname);

    let bundle = '';
    if (host.startsWith('thirdp.')) {
      // Third party UI
      bundle = 'third-party-fe';
    } else if (host.startsWith('licensing.')) {
      // licensing UI
      bundle = 'licensing-fe';
    } else if (host.startsWith('shop.')) {
      // Shop UI
      bundle = 'mechanic-shop-fe';
    } else {
      // End-user UI
      bundle = 'end-user-fe';
    }

    const fileToServe = path.join(
      __dirname,
      '../../../',
      bundle,
      'build',
      pathname,
      ...(basename.includes('.') ? [] : ['index.html']) // Add index.html at the end if no file was specified
    );

    return fileToServe;
  };

  /**
   * Static assets
   */
  app.use((req, res, next) => {
    const toServe = getServedFile(req);
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
      console.log('CDN error', err);
    }

    res.status(status).send(`error: ${message}`);
  });

  app.listen(80, () => {
    // eslint-disable-next-line no-console
    console.log(`CDN is listening on 80`);
  });
};

module.exports = cdnServer;

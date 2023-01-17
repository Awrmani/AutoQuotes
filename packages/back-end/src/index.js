require('dotenv').config();
const expressServer = require('./apiServer');
const cdnServer = require('./cdnServer');

expressServer();

/**
 * Only run CDN in production mode. Development and testing
 * uses the dev server to serve the FE
 */
if (process.env.BACKEND_ENVIRONMENT === 'production') {
  cdnServer();
}

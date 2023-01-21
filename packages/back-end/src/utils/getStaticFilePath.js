const path = require('path');

/**
 * This function takes the request object and returns
 * the file that should be served to the browser based on the
 * request pathname and the "host" request header
 */
const getStaticFilePath = ({ req, rootPath }) => {
  const { host } = req.headers ?? {};
  let { pathname } = new URL(req.originalUrl, 'http://dummy.com');
  pathname = pathname.replaceAll('..', '.'); // Do not serve paths outside of the bundle
  const basename = path.basename(pathname);

  let bundle = '';
  if (host.startsWith('thirdp.')) {
    // Third party UI
    bundle = 'third-party-fe';
  } else if (host.startsWith('shop.')) {
    // Shop UI
    bundle = 'mechanic-shop-fe';
  } else {
    // End-user UI
    bundle = 'end-user-fe';
  }

  const fileToServe = path.join(
    rootPath,
    'packages',
    bundle,
    'build',
    pathname,
    ...(basename.includes('.') ? [] : ['index.html']) // Add index.html at the end if no file was specified
  );

  return fileToServe;
};

module.exports = getStaticFilePath;

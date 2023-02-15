const express = require('express');
const enduser = require('./enduser');
const shop = require('./shop');
const thirdparty = require('./thirdparty');
const technical = require('./technical');
const FieldValidationError = require('../resources/FieldValidationError');

// const { authenticate } = require('../authorization');
// const api = require('./api');

const router = express.Router();

router.use('/enduser/v1', enduser);
router.use('/shop/v1', shop);
router.use('/thirdparty/v1', thirdparty);
if (process.env.NODE_ENV === 'development') {
  router.use('/technical/v1', technical);
}

// Health check route, required for start-server-and-test
router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json({ status: 'running' });
});

// Handle no route found
router.use((req, res) => {
  res.status(404).json({ error: 'No such route was found' });
});

/**
 * General error handling
 */
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  if (err instanceof FieldValidationError) {
    res.status(417).json({ fieldErrors: err.fieldErrors });
    return;
  }

  // If no specific error was given, default it
  const status = err.status || 500;
  const message = err.message || 'unable to process request';

  res.status(status).json({ error: message });
});

module.exports = router;

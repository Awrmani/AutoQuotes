const express = require('express');
const enduser = require('./enduser');
const shop = require('./shop');
const thirdparty = require('./thirdparty');

// const { authenticate } = require('../authorization');
// const api = require('./api');

const router = express.Router();

router.use('/enduser/v1', enduser);
router.use('/shop/v1', shop);
router.use('/thirdparty/v1', thirdparty);

// Health check route, required for start-server-and-test
router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json({ status: 'running' });
});

// Handle no route found
router.use((req, res) => {
  res.status(404).json({ error: 'No such route was found' });
});

module.exports = router;

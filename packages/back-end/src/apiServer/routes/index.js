const express = require('express');
const enduser = require('./enduser');
const shop = require('./shop');
const thirdparty = require('./thirdparty');

// const { authenticate } = require('../authorization');
// const api = require('./api');

const router = express.Router();

// Health check route, required for start-server-and-test
router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json({ status: 'running' });
});

router.use('/api/enduser/v1', enduser);
router.use('/api/shop/v1', shop);
router.use('/api/thirdparty/v1', thirdparty);

module.exports = router;

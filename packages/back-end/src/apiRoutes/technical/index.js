const express = require('express');
const reSeedDb = require('./reSeedDb');

const router = express.Router();

/**
 * These endpoints only work in development and testing
 */

router.post(`/reseed`, reSeedDb);

module.exports = router;

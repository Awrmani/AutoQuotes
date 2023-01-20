const express = require('express');
const login = require('./login');
// const { authenticate } = require('../authorization');

const router = express.Router();

router.post('/login', login);

// router.use(`/v1`, authenticate(), api);

module.exports = router;

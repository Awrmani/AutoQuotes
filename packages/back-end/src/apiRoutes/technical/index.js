const express = require('express');
const reSeedDb = require('./reSeedDb');
const addAppointment = require('./addAppointment');

const router = express.Router();

/**
 * These endpoints only work in development and testing
 */

router.post('/reseed', reSeedDb);
router.post('/addAppointment', addAppointment);

module.exports = router;

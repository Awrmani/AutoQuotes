const express = require('express');
const reSeedDb = require('./reSeedDb');
const addAppointment = require('./addAppointment');
const getEnduserVerificationCode = require('./getEnduserVerificationCode');

const router = express.Router();

/**
 * These endpoints only work in development and testing
 */

router.post('/reseed', reSeedDb);
router.post('/addAppointment', addAppointment);
router.get('/enduser/:id/confirmationCode', getEnduserVerificationCode);

module.exports = router;

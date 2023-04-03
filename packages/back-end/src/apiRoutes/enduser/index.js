const express = require('express');
const EndUser = require('../../resources/EndUser');
const { authenticatorFactory } = require('../../utils/authentication');
const postLogin = require('./postLogin');
const shopGet = require('./shopGet');
const currentUserGet = require('./currentUserGet');
const endUserCreate = require('./endUserCreate');
const confirmUser = require('./confirmUser');
const vehicleTypeList = require('./vehicleTypeList');
const quoteList = require('./quoteList');
const quoteCreate = require('./quoteCreate');
const quoteGet = require('./quoteGet');
const quoteUpdate = require('./quoteUpdate');
const quoteFinalize = require('./quoteFinalize');
const serviceList = require('./serviceList');
const serviceAdd = require('./serviceAdd');
const serviceDelete = require('./serviceDelete');
const offersRequest = require('./offersRequest');
const appointmentOptionsGet = require('./appointmentOptionsGet');
const appointmentCreate = require('./appointmentCreate');

const authenticator = authenticatorFactory({
  audience: 'enduser',
  UserClass: EndUser,
});

const optionalAuthenticator = authenticatorFactory({
  audience: 'enduser',
  UserClass: EndUser,
  optional: true,
});

const router = express.Router();

// User
router.post('/login', postLogin);
router.get('/users/current', authenticator, currentUserGet);
router.put('/users', endUserCreate);
router.post('/users/:id/confirm', confirmUser);

// Shop
router.get('/shop', shopGet);

// Vehicle type
router.get('/vehicleTypes', vehicleTypeList);

// Quotes
router.put('/quotes', optionalAuthenticator, quoteCreate);
router.get('/quotes', authenticator, quoteList);
router.get('/quotes/:quoteId', optionalAuthenticator, quoteGet);
router.patch('/quotes/:quoteId', optionalAuthenticator, quoteUpdate);
router.post('/quotes/:quoteId/finalize', authenticator, quoteFinalize);

// services

// This lists the services that are compatible with the vehicle
router.get('/quotes/:quoteId/services', optionalAuthenticator, serviceList);
router.put('/quotes/:quoteId/services', optionalAuthenticator, serviceAdd);
router.delete(
  '/quotes/:quoteId/services/:serviceTypeId',
  optionalAuthenticator,
  serviceDelete
);

// Offer requests
router.post('/quotes/:quoteId/requestOffers', authenticator, offersRequest);

// Appointments
router.get(
  '/quotes/:quoteId/appointmentOptions',
  authenticator,
  appointmentOptionsGet
);
router.put('/quotes/:quoteId/appointment', authenticator, appointmentCreate);

module.exports = router;

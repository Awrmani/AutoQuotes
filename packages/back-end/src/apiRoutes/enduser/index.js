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
router.post('/quotes/:id/associate', optionalAuthenticator, quoteGet);

module.exports = router;

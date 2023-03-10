const express = require('express');
const EndUser = require('../../resources/EndUser');
const { authenticatorFactory } = require('../../utils/authentication');
const postLogin = require('./postLogin');
const shopGet = require('./shopGet');
const currentUserGet = require('./currentUserGet');
const endUserCreate = require('./endUserCreate');
const confirmUser = require('./confirmUser');
const vehicleTypeList = require('./vehicleTypeList');

const authenticator = authenticatorFactory({
  audience: 'enduser',
  UserClass: EndUser,
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

module.exports = router;

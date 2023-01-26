const express = require('express');
const postLogin = require('./postLogin');
const getCurrentUser = require('./getCurrentUser');
const ShopUser = require('../../resources/ShopUser');
const { authenticatorFactory } = require('../../utils/authentication');

const authenticator = authenticatorFactory({
  audience: 'shop',
  UserClass: ShopUser,
});

const router = express.Router();

router.post('/login', postLogin);
router.get(`/users/current`, authenticator, getCurrentUser);

module.exports = router;

const express = require('express');
const postLogin = require('./postLogin');
const getCurrentUser = require('./getCurrentUser');
const shopGet = require('./shopGet');
const shopUpdate = require('./shopUpdate');
const ShopUser = require('../../resources/ShopUser');
const { authenticatorFactory } = require('../../utils/authentication');

const authenticator = authenticatorFactory({
  audience: 'shop',
  UserClass: ShopUser,
});

const router = express.Router();

router.post('/login', postLogin);
router.get(`/users/current`, authenticator, getCurrentUser);

// Shop RU handlers
router.get('/shop', shopGet);
router.patch('/shop', authenticator, shopUpdate);

module.exports = router;

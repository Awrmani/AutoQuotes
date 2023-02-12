const express = require('express');
const postLogin = require('./postLogin');
const shopGet = require('./shopGet');
const shopUpdate = require('./shopUpdate');
const shopUserGet = require('./shopUserGet');
const shopUserCreate = require('./shopUserCreate');
const shopUserUpdate = require('./shopUserUpdate');
const shopUserDelete = require('./shopUserDelete');
const ShopUser = require('../../resources/ShopUser');
const { authenticatorFactory } = require('../../utils/authentication');

const authenticator = authenticatorFactory({
  audience: 'shop',
  UserClass: ShopUser,
});

const router = express.Router();

router.post('/login', postLogin);

// Shop user CRUD handlers
router.get('/users/:id', authenticator, shopUserGet);
router.put('/users', authenticator, shopUserCreate);
router.patch('/users/:id', authenticator, shopUserUpdate);
router.delete('/users/:id', authenticator, shopUserDelete);

// Shop RU handlers
router.get('/shop', shopGet);
router.patch('/shop', authenticator, shopUpdate);

module.exports = router;

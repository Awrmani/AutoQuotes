const express = require('express');
const postLogin = require('./postLogin');
const ShopUser = require('../../resources/ShopUser');
const { authenticatorFactory } = require('../../utils/authentication');
const shopGet = require('./shopGet');
const shopUpdate = require('./shopUpdate');
const shopUserGet = require('./shopUserGet');
const shopUserList = require('./shopUserList');
const shopUserCreate = require('./shopUserCreate');
const shopUserUpdate = require('./shopUserUpdate');
const shopUserDelete = require('./shopUserDelete');
const partCreate = require('./partCreate');
const partGet = require('./partGet');
const partUpdate = require('./partUpdate');
const partDelete = require('./partDelete');
const partList = require('./partList');

const authenticator = authenticatorFactory({
  audience: 'shop',
  UserClass: ShopUser,
});

const router = express.Router();

router.post('/login', postLogin);

// Shop user CRUD handlers
router.get('/users', authenticator, shopUserList);
router.get('/users/:id', authenticator, shopUserGet);
router.put('/users', authenticator, shopUserCreate);
router.patch('/users/:id', authenticator, shopUserUpdate);
router.delete('/users/:id', authenticator, shopUserDelete);

// Shop RU handlers
router.get('/shop', shopGet);
router.patch('/shop', authenticator, shopUpdate);

// Part CRUD handlers
router.get('/parts', authenticator, partList);
router.get('/parts/:id', authenticator, partGet);
router.put('/parts', authenticator, partCreate);
router.patch('/parts/:id', authenticator, partUpdate);
router.delete('/parts/:id', authenticator, partDelete);

module.exports = router;

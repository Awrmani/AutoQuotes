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
const serviceCreate = require('./serviceCreate');
const serviceGet = require('./serviceGet');
const serviceList = require('./serviceList');
const serviceUpdate = require('./serviceUpdate');
const serviceDelete = require('./serviceDelete');
const appointmentGet = require('./appointmentGet');
const appointmentList = require('./appointmentList');
const appointmentDelete = require('./appointmentDelete');
const vehicleTypeCreate = require('./vehicleTypeCreate');
const vehicleTypeDelete = require('./vehicleTypeDelete');
const vehicleTypeGet = require('./vehicleTypeGet');
const vehicleTypeList = require('./vehicleTypeList');
const vehicleTypeUpdate = require('./vehicleTypeUpdate');

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

// ServiceType
router.get('/services', authenticator, serviceList);
router.get('/services/:id', authenticator, serviceGet);
router.put('/services', authenticator, serviceCreate);
router.patch('/services/:id', authenticator, serviceUpdate);
router.delete('/services/:id', authenticator, serviceDelete);

// Appointment
router.get('/appointments', authenticator, appointmentList);
router.get('/appointments/:id', authenticator, appointmentGet);
router.delete('/appointments/:id', authenticator, appointmentDelete);

// Vehicle type
router.get('/vehicleTypes', authenticator, vehicleTypeList);
router.get('/vehicleTypes/:id', authenticator, vehicleTypeGet);
router.put('/vehicleTypes', authenticator, vehicleTypeCreate);
router.patch('/vehicleTypes/:id', authenticator, vehicleTypeUpdate);
router.delete('/vehicleTypes/:id', authenticator, vehicleTypeDelete);

module.exports = router;

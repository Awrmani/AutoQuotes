const express = require('express');
// const EndUser = require('../../resources/EndUser');
// const { authenticatorFactory } = require('../../utils/authentication');
/*
const authenticator = authenticatorFactory({
  audience: 'enduser',
  UserClass: EndUser,
});
*/

const router = express.Router();

// router.use(`/v1`, authenticator, api);

module.exports = router;

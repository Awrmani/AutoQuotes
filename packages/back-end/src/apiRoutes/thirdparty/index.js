const express = require('express');
const quoteRequestGet = require('./quoteRequestGet');
const offerPut = require('./offerPut');

const router = express.Router();

// Quote request GET
router.get('/suppliers/:supplierId/quotes/:quoteId', quoteRequestGet);

// Offer PUT
router.put(
  '/suppliers/:supplierId/quotes/:quoteId/parts/:partRequestId',
  offerPut
);

module.exports = router;

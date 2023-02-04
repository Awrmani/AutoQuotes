const mongoose = require('mongoose');
//const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const ResourceBase = require('./ResourceBase');

const quoteLineSchema = new mongoose.Schema(
  {
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SupplierOffer',
    },
    serviceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceType',
    },
    quote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quote',
    },
    parts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Part',
    },
    duration: Number,
  },
  {
    // Auto handle createdAt, updatedAt in ISO8601 format
    timestamps: true,
  }
);

const QuoteLineItemModel = mongoose.model('quoteLineItems', quoteLineSchema);

const validatorConfig = {};

class QuoteLineItem extends ResourceBase {
  constructor(attributes) {
    super({ Model: QuoteLineItemModel, validatorConfig, attributes });
  }
}

module.exports = QuoteLineItem;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.QuoteLineItemModel = QuoteLineItemModel;

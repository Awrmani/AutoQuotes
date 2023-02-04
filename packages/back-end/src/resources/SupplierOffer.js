const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const ResourceBase = require('./ResourceBase');

const supplierOfferSchema = new mongoose.Schema(
  {
    Supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ThirdPartySupplier',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    warrantyPeriod: {
      type: Number,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    description: String,
  },
  {
    // Auto handle createdAt, updatedAt in ISO8601 format
    timestamps: true,
  }
);

const SupplierOfferModel = mongoose.model(
  'supplierOffers',
  supplierOfferSchema
);

const validatorConfig = {
  manufacturer: [stringValidators.required],
};

class SupplierOffer extends ResourceBase {
  constructor(attributes) {
    super({ Model: SupplierOfferModel, validatorConfig, attributes });
  }
}

module.exports = SupplierOffer;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.SupplierOfferModel = SupplierOfferModel;

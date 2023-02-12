const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const numberValidators = require('@autoquotes/libraries/src/utils/validation/number');
const ResourceBase = require('./ResourceBase');

const supplierOfferSchema = new mongoose.Schema(
  {
    supplier: {
      type: String,
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
    toJSON: {
      // Map _id over to id and stringify
      transform(doc, ret) {
        // eslint-disable-next-line no-param-reassign
        ret.id = ret._id.toString();
        // eslint-disable-next-line no-param-reassign
        delete ret._id;
      },
    },
  }
);

const SupplierOfferModel = mongoose.model(
  'supplierOffers',
  supplierOfferSchema
);

const validatorConfig = {
  supplier: [stringValidators.required],
  price: [numberValidators.required],
  warrantyPeriod: [numberValidators.required],
  manufacturer: [stringValidators.required],
  description: [stringValidators.isString],
};

class SupplierOffer extends ResourceBase {
  constructor(attributes) {
    super({ Model: SupplierOfferModel, validatorConfig, attributes });
  }
}

module.exports = SupplierOffer;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.SupplierOfferModel = SupplierOfferModel;

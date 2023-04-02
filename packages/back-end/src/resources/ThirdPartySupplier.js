const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const ResourceBase = require('./abstracts/ResourceBase');

const thirdPartySupplierSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    zip: String,
    city: String,
    state: String,
    country: String,
    email: String,
    phone: String,
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

const ThirdPartySupplierModel = mongoose.model(
  'thirdPartySuppliers',
  thirdPartySupplierSchema
);

const validatorConfig = {
  name: [stringValidators.required],
  address: [stringValidators.required],
  zip: [stringValidators.required],
  city: [stringValidators.required],
  state: [stringValidators.required],
  country: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  phone: [stringValidators.required],
};

class ThirdPartySupplier extends ResourceBase {
  constructor(attributes) {
    super({ Model: ThirdPartySupplierModel, validatorConfig, attributes });
  }
}

module.exports = ThirdPartySupplier;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.ThirdPartySupplierModel = ThirdPartySupplierModel;

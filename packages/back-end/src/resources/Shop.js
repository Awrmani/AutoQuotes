const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const ResourceBase = require('./ResourceBase');

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    publicAddress: {
      type: String,
      required: true,
    },
    logo: {
      type: Blob,
    },
    slogan: String,
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    operatingHours: [String],
    returnPolicyUrl: String,
    termsAndConditionsUrl: String,
    privacyPolicyUrl: String,
    address1: String,
    address2: String,
    zip: String,
    city: String,
    state: String,
    country: String,
  },
  {
    // Auto handle createdAt, updatedAt in ISO8601 format
    timestamps: true,
  }
);

const ShopModel = mongoose.model('shop', shopSchema);

const validatorConfig = {
  name: [stringValidators.required],
  publicAddress: [stringValidators.required],
  logo: [],
  slogan: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  phone: [stringValidators.required],
  operatingHours: [],
  returnPolicyUrl: [stringValidators.required],
  termsAndConditionsUrl: [stringValidators.required],
  privacyPolicyUrl: [stringValidators.required],
  address1: [stringValidators.required],
  address2: [stringValidators.required],
  zip: [stringValidators.required],
  city: [stringValidators.required],
  state: [stringValidators.required],
  country: [stringValidators.required],
};

class Shop extends ResourceBase {
  constructor(attributes) {
    super({ Model: ShopModel, validatorConfig, attributes });
  }
}

module.exports = Shop;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.ShopModel = ShopModel;

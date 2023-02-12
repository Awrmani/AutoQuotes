const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const openingHoursValidator = require('@autoquotes/libraries/src/utils/validation/openingHours');
const ResourceBase = require('./ResourceBase');

const shopSchema = new mongoose.Schema(
  {
    name: String,
    logo: String,
    slogan: String,
    email: String,
    phone: String,
    openingHours: {
      monday: {
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      tuesday: {
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      wednesday: {
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      thursday: {
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      friday: {
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      saturday: {
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      sunday: {
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
    },
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

const ShopModel = mongoose.model('shop', shopSchema);

const validatorConfig = {
  name: [stringValidators.required],
  logo: [stringValidators.isString],
  slogan: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  phone: [stringValidators.required],
  openingHours: [openingHoursValidator.openingHours],
  returnPolicyUrl: [stringValidators.required],
  termsAndConditionsUrl: [stringValidators.required],
  privacyPolicyUrl: [stringValidators.required],
  address1: [stringValidators.required],
  address2: [stringValidators.isString],
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

const mongoose = require('mongoose');
const { subValidator } = require('@autoquotes/libraries/src/utils/validation');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const booleanValidators = require('@autoquotes/libraries/src/utils/validation/boolean');
const UserResourceBase = require('./abstracts/UserResourceBase');

const endUserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      index: { unique: true },
    },
    phone: String,
    password: String,
    isVerified: Boolean,
    verificationCode: String,
    billingInformation: {
      _id: false,
      name: String,
      address1: String,
      address2: String,
      zip: String,
      city: String,
      state: String,
      country: String,
    },
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

const EndUserModel = mongoose.model('endUsers', endUserSchema);

const validatorConfig = {
  name: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  phone: [stringValidators.required],
  password: [stringValidators.required],
  isVerified: [booleanValidators.isBoolean],
  verificationCode: [stringValidators.required],
  billingInformation: [
    subValidator({
      name: [stringValidators.required],
      address1: [stringValidators.required],
      address2: [stringValidators.isString],
      zip: [stringValidators.required],
      city: [stringValidators.required],
      state: [stringValidators.required],
      country: [stringValidators.required],
    }),
  ],
};

class EndUser extends UserResourceBase {
  constructor(attributes) {
    super({ Model: EndUserModel, validatorConfig, attributes });
  }
}

module.exports = EndUser;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.EndUserModel = EndUserModel;

const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const UserResourceBase = require('./UserResourceBase');

const endUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    phone: String,
    passwordHash: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
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
  username: [stringValidators.required],
  name: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  passwordHash: [stringValidators.required],
};

class EndUser extends UserResourceBase {
  constructor(attributes) {
    super({ Model: EndUserModel, validatorConfig, attributes });
  }
}

module.exports = EndUser;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.EndUserModel = EndUserModel;

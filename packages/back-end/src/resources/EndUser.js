const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const UserResourceBase = require('./UserResourceBase');

const endUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: { unique: true },
    },
    phone: String,
    passwordHash: {
      type: String,
      required: true,
      minlength: 8,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    quotes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Quote',
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    },
  },
  {
    // Auto handle createdAt, updatedAt in ISO8601 format
    timestamps: true,
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

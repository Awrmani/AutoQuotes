const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const UserResourceBase = require('./UserResourceBase');

/**
 * Example usage
 * const su = new ShopUser({ firstName: 'j', lastName: 'd', email: 'a@a.com', password: 'foo' });
 * su.save() // saves, returns document ID (string)
 *  .then(id => new ShopUser(id)) // reloads, returns instance
 *  .then(su.delete) // deletes, returns old document ID (string)
 *  .then(console.log);
 */

const shopUserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: { unique: true },
    },
    phone: String,
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: Number,
      enum: ['employee', 'admin'],
      default: {
        role: 'employee',
      },
    },
  },
  {
    // Auto handle createdAt, updatedAt in ISO8601 format
    timestamps: true,
  }
);

const ShopUserModel = mongoose.model('shopUsers', shopUserSchema);

// This is the validation that is run against creating new entity, and updating entity
const validatorConfig = {
  firstName: [stringValidators.required],
  lastName: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  password: [stringValidators.required],
};

class ShopUser extends UserResourceBase {
  constructor(attributes) {
    super({ Model: ShopUserModel, validatorConfig, attributes });
  }
}

module.exports = ShopUser;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.ShopUserModel = ShopUserModel;

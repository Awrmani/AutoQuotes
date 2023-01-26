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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
  // ... TODO
};

class ShopUser extends UserResourceBase {
  constructor(attributes) {
    super({ Model: ShopUserModel, validatorConfig, attributes });
  }
}

module.exports = ShopUser;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.ShopUserModel = ShopUserModel;

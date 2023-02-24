const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const UserResourceBase = require('./abstracts/UserResourceBase');

/**
 * Example usage
 * const su = new ShopUser({ firstName: 'j', lastName: 'd', email: 'a@a.com', password: 'foo' });
 * su.save() // saves, returns document ID (string)
 *  .then(id => new ShopUser().loadById(id)) // reloads, returns instance
 *  .then(su.delete) // deletes, returns old document ID (string)
 *  .then(console.log);
 * ---
 * const su = await new ShopUser().loadBy({ email: 'a@a.com' });
 */

const shopUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['employee', 'admin'],
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

const ShopUserModel = mongoose.model('shopUsers', shopUserSchema);

// This is the validation that is run against creating new entity, and updating entity
const validatorConfig = {
  name: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  phone: [stringValidators.isString],
  password: [stringValidators.required],
  role: [
    stringValidators.required,
    stringValidators.oneOf(['employee', 'admin']),
  ],
};

class ShopUser extends UserResourceBase {
  constructor(attributes) {
    super({ Model: ShopUserModel, validatorConfig, attributes });
  }
}

module.exports = ShopUser;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.ShopUserModel = ShopUserModel;

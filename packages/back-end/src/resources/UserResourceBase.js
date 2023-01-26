const sha1 = require('sha1');
const { omit } = require('lodash');

const ResourceBase = require('./ResourceBase');

/**
 * Handle a user type resource (abstract class).
 * Email and Password are mandatory types
 */

class UserResourceBase extends ResourceBase {
  constructor({ Model, validatorConfig, attributes }) {
    if (typeof attributes === 'string' && !attributes.includes('@')) {
      // Create instance by reloading persisted data by id
      return super({ Model, validatorConfig, attributes });
    }

    if (typeof attributes === 'string') {
      // Look up user by email
      super({ Model, validatorConfig });

      return this._loadByEmail(attributes);
    }

    // Alter original attibutes, hash password
    return super({
      Model,
      validatorConfig,
      attributes: {
        ...attributes,
        ...(attributes.password && { password: sha1(attributes.password) }),
      },
    });
  }

  _loadByEmail = async email => {
    const mongooseObj = await this._Model.findOne({ email }).exec();

    if (!mongooseObj) throw new Error('User not found');

    this._loadByMongooseObj(mongooseObj);
    return this;
  };

  // When updating password make sure to hash it
  update = toSet => {
    return super.update({
      ...toSet,
      ...(toSet.password && { password: sha1(toSet.password) }),
    });
  };

  validatePassword = password => {
    return this._attributes.password === sha1(password);
  };

  // Make sure we don't return the user's hashed password
  get attributes() {
    return omit(super.attributes, ['password']);
  }
}

module.exports = UserResourceBase;

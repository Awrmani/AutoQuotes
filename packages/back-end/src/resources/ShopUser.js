const { pick } = require('lodash');
const validatorFactory = require('@autoquotes/libraries/src/utils/validation');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const FieldValidationError = require('./FieldValidationError');

const validatorConfig = {
  firstName: [stringValidators.required, stringValidators.email],
  lastName: [stringValidators.required],
  // ... TODO
};

class ShopUser {
  constructor(rawProps) {
    const props = pick(rawProps, Object.keys(validatorConfig)); // Make sure we validate all incoming props. What's not in the validator gets removed
    const validationResult = validatorFactory(validatorConfig)(props); // Run the valitator on the fields
    if (Object.keys(validationResult).length) {
      // If one or more fields have a validation error, we throw a FieldValidationError type object.
      // We can later detect the type, and return the error to the front-end.
      throw new FieldValidationError(validationResult);
    }

    // Validation is successful, let's copy the incoming props to `this`
    Object.assign(this, props);
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static async byId(id) {
    // TODO reload entity based on ID
    return {};
  }

  delete = async () => {
    // TODO delete by this.id
    return this;
  };

  save = async () => {
    this.updatedAt = new Date().toISOString();

    // TODO save
  };

  validatePassword = async () => {
    // TODO validate the pass and return boolean

    return this;
  };
}

module.exports = ShopUser;

const { pick, omit } = require('lodash');
const sha1 = require('sha1');
const validatorFactory = require('@autoquotes/libraries/src/utils/validation');
const FieldValidationError = require('./FieldValidationError');

/**
 * This is an abstract class that has to be extended by
 * at least Model and validatorConfig. All base functions to
 * create, reload, save, update, delete should be implemented
 * here to enhance code reuse between all resources
 */
class ResourceBase {
  constructor({ Model, validatorConfig, attributes }) {
    this.Model = Model;
    this.validatorConfig = validatorConfig;

    if (typeof attributes === 'string') {
      // Create instance by reloading persisted data by id
      return this.loadById(attributes);
    }

    // Create an instance with new data, not ever persisted
    this.createNew(attributes);
  }

  /**
   * This async instance function reloads the data from monoose
   * and stores it in `this`
   */
  loadById = async idToGet => {
    this.attributes = await this.Model.findById(idToGet)
      .exec()
      // Transform the result that we return
      .then(instance => {
        // Rename `_id` to `id` to abstract implementation away
        const { _id: id, ...rest } = instance._doc;
        return { id, ...rest };
      });

    return this;
  };

  /**
   * This instance function makes sure that the data for
   * the new instance is correct, then stores it in `this`
   */
  createNew = props => {
    this.attributes = this.validate({
      ...props,
      ...(props.password && { password: sha1(props.password) }),
    });
  };

  /**
   * This instance function makes sure that the data for
   * the new instance is correct and only data that have
   * been validated is present. Returns sanitized data
   */
  validate = rawProps => {
    const props = pick(rawProps, Object.keys(this.validatorConfig)); // Make sure we validate all incoming props. What's not in the validator gets removed
    const validationResult = validatorFactory(this.validatorConfig)(props); // Run the valitator on the fields
    if (Object.keys(validationResult).length) {
      // If one or more fields have a validation error, we throw a FieldValidationError type object.
      // We can later detect the type, and return the error to the front-end.
      throw new FieldValidationError(validationResult);
    }

    return props;
  };

  update = toSet => {
    // merge old attributes with input, and sanitize / verify them
    const sanitized = this.validate({
      ...this.attributes,
      ...toSet,
    });

    // Validate did remove some important attributes, like id, and createdAt, so put them back
    this.attributes = { ...this.attributes, ...sanitized };
  };

  save = async () => {
    if (!this.attributes.id) {
      const document = await new this.Model(this.attributes).save();
      this.attributes.id = document._id.toString();
      return this.attributes.id;
    }

    await this.Model.findOneAndUpdate(
      { _id: this.attributes.id },
      omit(this.attributes, ['id'])
    );

    return this.attributes.id;
  };

  delete = async () => {
    await this.Model.findByIdAndDelete(this.attributes.id);

    return this.attributes.id;
  };

  // This is only used if it's a user type instance
  validatePassword = async password => {
    return this.attributes.password === sha1(password);
  };
}

module.exports = ResourceBase;

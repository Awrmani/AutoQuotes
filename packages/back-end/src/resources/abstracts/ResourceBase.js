const { pick, omit } = require('lodash');
const validatorFactory = require('@autoquotes/libraries/src/utils/validation');
const FieldValidationError = require('../errors/FieldValidationError');
const NotFoundError = require('../errors/NotFoundError');
const InvalidSearchCriteriaError = require('../errors/InvalidSearchCriteriaError');

/**
 * This is an abstract class that has to be extended by
 * at least Model and validatorConfig. All base functions to
 * create, reload, save, update, delete should be implemented
 * here to enhance code reuse between all resources
 */
class ResourceBase {
  _Model;

  _validatorConfig;

  _attributes;

  _isSaved;

  constructor({ Model, validatorConfig, attributes }) {
    this._Model = Model;
    this._validatorConfig = validatorConfig;

    if (!attributes) return this;

    // Create an instance with new data, not ever persisted
    this._attributes = this._validate(attributes);
    this._isSaved = false;

    return this;
  }

  /**
   * This instance function parses the data from monoose object
   * and stores it in `this`
   * This is useful if we want to look up based on something other than
   * id.
   */
  async _populateWithMongooseObj(mongooseObj) {
    // remove __v
    const { __v: v, ...rest } = mongooseObj.toJSON();
    this._attributes = rest;
    this._isSaved = true;

    return this;
  }

  /**
   * This async instance function parses reloads the data from
   * mongoose and stores it in `this`
   */
  async loadById(idToGet) {
    const mongooseObj = await this._Model.findById(idToGet).exec();

    if (!mongooseObj) throw new NotFoundError();

    return this._populateWithMongooseObj(mongooseObj);
  }

  /**
   * This async instance fn allows to reload an entity
   * based on custom search criteria
   */
  async loadBy({ id, ...rest } = {}) {
    const criteria = {
      ...(id && { _id: id }),
      ...rest,
    };

    let mongooseObj;

    try {
      mongooseObj = await this._Model.findOne(criteria).exec();
    } catch (e) {
      throw new InvalidSearchCriteriaError();
    }

    if (!mongooseObj) throw new NotFoundError();

    return this._populateWithMongooseObj(mongooseObj);
  }

  /**
   * This instance function makes sure that the data for
   * the new instance is correct and only data that have
   * been validated is present. Returns sanitized data
   */
  _validate(rawProps) {
    const props = pick(rawProps, Object.keys(this._validatorConfig)); // Make sure we validate all incoming props. What's not in the validator gets removed
    const validationResult = validatorFactory(this._validatorConfig)(props); // Run the valitator on the fields
    if (Object.keys(validationResult).length) {
      // If one or more fields have a validation error, we throw a FieldValidationError type object.
      // We can later detect the type, and return the error to the front-end.
      throw new FieldValidationError(validationResult);
    }

    return {
      ...props,
      ...(rawProps.id && { id: rawProps.id }),
    };
  }

  update(toSet) {
    // merge old attributes with input, and sanitize / verify them
    const sanitized = this._validate({
      ...this._attributes,
      ...toSet,
    });

    // Validate did remove some important attributes, like id, and createdAt, so put them back
    this._attributes = {
      ...this._attributes,
      ...sanitized,
    };

    return this;
  }

  async save() {
    if (!this._isSaved) {
      const { id, ...attributes } = this._attributes;
      const document = await new this._Model({ _id: id, ...attributes }).save();
      this._attributes.id = document._id.toString();
      return this._attributes.id;
    }

    await this._Model.findOneAndUpdate(
      { _id: this._attributes.id },
      omit(this._attributes, ['id'])
    );

    return this._attributes.id;
  }

  async delete() {
    await this._Model.findByIdAndDelete(this._attributes.id);
    this._isSaved = false;

    return this._attributes.id;
  }

  get attributes() {
    return this._attributes;
  }
}

module.exports = ResourceBase;

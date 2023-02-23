class FieldValidationError extends Error {
  constructor(fieldErrors) {
    super('Field validation failed');
    this.fieldErrors = fieldErrors;
  }
}

module.exports = FieldValidationError;

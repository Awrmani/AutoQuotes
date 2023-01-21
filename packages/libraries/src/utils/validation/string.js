const validateEmail = require('email-validator').validate;

const isString = value =>
  typeof value === 'string' ? undefined : 'Not a string';

const required = value => {
  const result = isString(value);
  if (result) return result;

  return value.length ? undefined : 'Required';
};

const minLength = min => value => {
  const result = isString(value);
  if (result) return result;

  if (value.length && value.length < min)
    return `Minimum ${min} characters needed!`;

  return undefined;
};

const verifyInput = to => (value, allValues) => {
  const result = isString(value);
  if (result) return result;

  if (value.length && value !== allValues[to])
    return "Verification doesn't match";

  return undefined;
};

const email = value =>
  validateEmail(value) ? undefined : 'Invalid email address';

// Using CJS export as this is used in both CJS and MJS
module.exports = { isString, required, minLength, verifyInput, email };

const validateEmail = require('email-validator').validate;

const isStringOrUndefined = value =>
  ['string', 'undefined'].includes(typeof value) ? undefined : 'Not a string';

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

const iso8601 = value => {
  if (
    !/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/.test(
      value
    )
  ) {
    return 'Invalid ISO8601 format';
  }

  try {
    // eslint-disable-next-line no-new
    new Date(value);
  } catch (e) {
    return 'Invalid ISO8601 format';
  }
  return undefined;
};

const oneOf = options => value =>
  options.includes(value) ? undefined : `Must be one of ${options.join('/')}`;

// Using CJS export as this is used in both CJS and MJS
module.exports = {
  isStringOrUndefined,
  isString,
  required,
  minLength,
  verifyInput,
  email,
  iso8601,
  oneOf,
};

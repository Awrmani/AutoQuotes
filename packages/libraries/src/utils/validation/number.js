const isNumber = value =>
  typeof value === 'number' ? undefined : 'Not a number';

const isNumberOrUndefined = value =>
  ['number', 'undefined'].includes(typeof value) ? undefined : 'Not a number';

const required = value => {
  const result = isNumber(value);
  if (result) return result;

  return value ? undefined : 'Required';
};

// Using CJS export as this is used in both CJS and MJS
module.exports = { isNumber, isNumberOrUndefined, required };

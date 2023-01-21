const isBoolean = value =>
  typeof value === 'boolean' ? undefined : 'Not a boolean';

const required = value => {
  const result = isBoolean(value);
  if (result) return result;

  return value ? undefined : 'Required';
};

// Using CJS export as this is used in both CJS and MJS
module.exports = { isBoolean, required };

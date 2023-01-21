const isArray = value => (Array.isArray(value) ? undefined : 'Not an array');

const required = value => {
  const result = isArray(value);
  if (result) return result;

  return value.length ? undefined : 'Required';
};

// Using CJS export as this is used in both CJS and MJS
module.exports = { isArray, required };

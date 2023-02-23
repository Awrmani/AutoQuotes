const isArray = value => (Array.isArray(value) ? undefined : 'Not an array');

const required = value => {
  const result = isArray(value);
  if (result) return result;

  return value.length ? undefined : 'Required';
};

const arrayOfStrings = value => {
  if (!Array.isArray(value)) return 'Not an array';

  for (let i = 0; i < value.length; i++) {
    if (typeof value[i] !== 'string') return `index ${i} is not a string`;
  }

  return undefined;
};

// Using CJS export as this is used in both CJS and MJS
module.exports = { isArray, required, arrayOfStrings };

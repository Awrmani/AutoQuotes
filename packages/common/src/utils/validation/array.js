export const isArray = value =>
  Array.isArray(value) ? undefined : 'Not an array';

export const required = value => {
  const result = isArray(value);
  if (result) return result;

  return value.length ? undefined : 'Required';
};

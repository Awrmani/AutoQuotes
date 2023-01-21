export const isBoolean = value =>
  typeof value === 'boolean' ? undefined : 'Not a boolean';

export const required = value => {
  const result = isBoolean(value);
  if (result) return result;

  return value ? undefined : 'Required';
};

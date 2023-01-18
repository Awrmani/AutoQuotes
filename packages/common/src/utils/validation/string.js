import { validate as validateEmail } from 'email-validator';

export const isString = value =>
  typeof value === 'string' ? undefined : 'Not a string';

export const required = value => {
  const result = isString(value);
  if (result) return result;

  return value.length ? undefined : 'Required';
};

export const minLength = min => value => {
  const result = isString(value);
  if (result) return result;

  if (value.length && value.length < min)
    return `Minimum ${min} characters needed!`;

  return undefined;
};

export const verifyInput = to => (value, allValues) => {
  const result = isString(value);
  if (result) return result;

  if (value.length && value !== allValues[to])
    return "Verification doesn't match";

  return undefined;
};

export const email = value =>
  validateEmail(value) ? undefined : 'Invalid email address';

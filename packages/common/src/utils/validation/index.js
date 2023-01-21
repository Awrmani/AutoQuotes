import * as stringValidators from './string';
import * as booleanValidators from './boolean';
import * as arrayValidators from './array';

/**
 * This Fn handles all validators for a specific field
 * We return the first error in the set
 */
const validateField = ({ validatorArr, value, allValues }) =>
  // If we got a single element instead of an array, we should still work
  (Array.isArray(validatorArr) ? validatorArr : [validatorArr]).reduce(
    (acc, validatorFn) => acc ?? validatorFn(value, allValues),
    undefined
  );

/**
 * This curried function takes config (see above) and then the
 * form state to be validated. Loops through all fields
 * and calls validateField, then collects all errors withing a form
 */
const validatorFactory = config => data => {
  const errors = Object.keys(config).reduce((acc, fieldName) => {
    const error = validateField({
      validatorArr: config[fieldName],
      value: data[fieldName],
      allValues: data,
    });

    return {
      // Bring results of previous field validations
      ...acc,
      // Add error if field falidation failed
      ...(error && { [fieldName]: error }),
    };
  }, {});

  return errors;
};

export default validatorFactory;
export { stringValidators, booleanValidators, arrayValidators };

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

/**
 * This Fn allows us to validate a single sub collection
 */
const subValidator = config => {
  const validator = validatorFactory(config);

  return values => {
    const failed = Object.keys(validator(values));
    if (!failed.length) return undefined;

    return `The follwing attributes are incorrect: ${failed.join(', ')}`;
  };
};

/**
 * This fn allows to deep validate an array
 */
const arrayOf = validatorArr => {
  return valuesArray => {
    if (!Array.isArray(valuesArray)) return 'Not an array';

    // Take the first error from the list
    const [error] = valuesArray
      // run validator(s) on each element
      .map((value, index) => {
        const fieldValidationResult = validateField({
          validatorArr,
          value,
        });

        if (fieldValidationResult)
          return `${fieldValidationResult} in array index [${index}]`;

        return undefined;
      })
      // only keep failures
      .filter(v => !!v);

    return error; // Either a validation error or undefined if there were none
  };
};

validatorFactory.subValidator = subValidator;
validatorFactory.arrayOfValidator = arrayOf;

// Using CJS export as this is used in both CJS and MJS
module.exports = validatorFactory;

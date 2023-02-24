import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import formContext from './formContext';

const Field = ({ component: Component, ...props }) => {
  const { name } = props;
  const {
    values,
    errors,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
    touched,
  } = useContext(formContext);

  const handleChange = useCallback(
    newValue => {
      setFieldValue(name, newValue);
    },
    [setFieldValue, name]
  );

  const handleBlur = useCallback(() => {
    setFieldTouched(name);
  }, [setFieldTouched, name]);

  return (
    <Component
      value={get(values, name)}
      // Only display errors on touched inputs
      error={touched[name] ? errors[name] : undefined}
      onChange={handleChange}
      onBlur={handleBlur}
      isSubmitting={isSubmitting}
      {...props}
    />
  );
};

Field.propTypes = {
  component: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
};

export default Field;

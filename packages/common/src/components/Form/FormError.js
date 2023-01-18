import React, { useContext } from 'react';
import formContext from './formContext';
import FieldError from './FieldError';

const FormError = () => {
  const form = useContext(formContext);
  const error = form.errors?.['*'];

  return <FieldError error={error} />;
};

export default FormError;

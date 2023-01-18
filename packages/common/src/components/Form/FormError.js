import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import formContext from './formContext';

const FormError = props => {
  const form = useContext(formContext);
  const error = form.errors?.['*'];
  if (!error) return null;

  return (
    <Typography variant="danger" component="div" {...props}>
      {error}
    </Typography>
  );
};

export default FormError;

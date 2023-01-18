import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import formContext from './formContext';

const SubmitButton = ({ disabled, ...rest }) => {
  const { isSubmitting, submitForm } = useContext(formContext);

  return (
    <Button
      variant="contained"
      {...rest}
      disabled={disabled || isSubmitting}
      onClick={submitForm}
    />
  );
};

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  disabled: undefined,
};

export default SubmitButton;

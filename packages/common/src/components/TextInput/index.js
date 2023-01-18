import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

const TextInput = ({
  onChange,
  error,
  description,
  isSubmitting,
  isRequired,
  ...rest
}) => {
  const handleChange = useCallback(
    e => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <TextField
      required={isRequired}
      helperText={error ?? description}
      error={!!error}
      disabled={isSubmitting}
      onChange={handleChange}
      {...rest}
    />
  );
};

TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  description: PropTypes.string,
  isSubmitting: PropTypes.bool,
  isRequired: PropTypes.bool,
};

TextInput.defaultProps = {
  error: undefined,
  description: undefined,
  isSubmitting: false,
  isRequired: false,
};

export default TextInput;

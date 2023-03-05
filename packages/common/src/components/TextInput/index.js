import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField, Autocomplete } from '@mui/material';

const TextInput = ({
  onChange,
  value,
  error,
  description,
  isSubmitting,
  options,
  ...rest
}) => {
  const handleChange = useCallback(
    (e, newValue) => {
      onChange(newValue ?? e?.target?.value);
    },
    [onChange]
  );

  if (!options)
    return (
      <TextField
        helperText={error ?? description}
        error={!!error}
        disabled={isSubmitting}
        value={value}
        onChange={handleChange}
        variant="standard"
        {...rest}
      />
    );

  return (
    <Autocomplete
      inputValue={String(value)}
      onInputChange={handleChange}
      freeSolo
      options={options}
      renderInput={params => (
        <TextField
          {...rest}
          {...params}
          variant="standard"
          helperText={error ?? description}
          error={!!error}
          disabled={isSubmitting}
        />
      )}
    />
  );
};

TextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  description: PropTypes.string,
  isSubmitting: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
};

TextInput.defaultProps = {
  error: undefined,
  description: undefined,
  isSubmitting: false,
  options: undefined,
};

export default TextInput;

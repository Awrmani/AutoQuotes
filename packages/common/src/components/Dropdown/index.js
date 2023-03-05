import React, { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Dropdown = ({
  onChange,
  error,
  description,
  isSubmitting,
  options,
  label,
  ...rest
}) => {
  const [labelId] = useState(() => uuid());

  const handleChange = useCallback(
    e => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        helperText={error ?? description}
        error={!!error}
        disabled={isSubmitting}
        onChange={handleChange}
        label={label}
        {...rest}
      >
        {options.map(option => (
          <MenuItem
            value={option.value}
            key={option.value}
            data-testid={`select-option-${option.value}`}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  description: PropTypes.string,
  isSubmitting: PropTypes.bool,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Dropdown.defaultProps = {
  error: undefined,
  description: undefined,
  isSubmitting: false,
};

export default Dropdown;

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';

const DateTimePicker = ({
  onChange,
  value,
  error,
  description,
  isSubmitting,
  options,
  ...rest
}) => {
  const handleChange = useCallback(
    newValue => {
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        disabled={isSubmitting}
        value={value}
        onChange={handleChange}
        {...rest}
        showDaysOutsideCurrentMonth
        disablePast
        slots={{ actionBar: () => null, toolbar: () => null }}
        views={['day']}
        slotProps={{ layout: {} }}
      />
    </LocalizationProvider>
  );
};

DateTimePicker.propTypes = {
  value: PropTypes.instanceOf(moment),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  description: PropTypes.string,
  isSubmitting: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
};

DateTimePicker.defaultProps = {
  error: undefined,
  description: undefined,
  isSubmitting: false,
  options: undefined,
};

export default DateTimePicker;

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dropdown from '@autoquotes/common/src/components/Dropdown';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Container, Paper } from '@mui/material';
import { Field, SubmitButton } from '@autoquotes/common/src/components/Form';
import { useSelector } from 'react-redux';
import { getAppointments } from '../../reducers/compositeReducers';

const Appointment = ({ date, setDate }) => {
  const appointments = useSelector(getAppointments);

  const onDatePicked = useCallback(
    value => {
      setDate(value);
    },
    [setDate]
  );

  return (
    <Container component={Paper} sx={{ display: 'flex', p: 2 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          value={date}
          showDaysOutsideCurrentMonth
          disablePast
          onChange={onDatePicked}
        />
      </LocalizationProvider>
      <Box sx={{ mx: 2, minWidth: 300 }}>
        <Field
          variant="outlined"
          labelml={2}
          component={Dropdown}
          name="start"
          label="Available appointments"
          options={appointments}
          fullWidth
        />
      </Box>
      <SubmitButton sx={{ ml: 2 }} variant="contained" size="large">
        Book Appointment
      </SubmitButton>
    </Container>
  );
};
Appointment.propTypes = {
  date: PropTypes.instanceOf(moment),
  setDate: PropTypes.func,
};

export default Appointment;

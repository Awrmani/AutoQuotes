import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dropdown from '@autoquotes/common/src/components/Dropdown';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import moment from 'moment';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Box, Container, Paper, Typography } from '@mui/material';
import { Field, SubmitButton } from '@autoquotes/common/src/components/Form';
import { useSelector } from 'react-redux';
import { getAppointments } from '../../reducers/compositeReducers';

const Appointment = ({ date, setDate }) => {
  const appointments = useSelector(getAppointments);
  const { values } = useContext(formContext);

  const onDatePicked = useCallback(
    value => {
      setDate(value);
    },
    [setDate]
  );

  return (
    <Container component={Paper}>
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom component="h1" variant="h4">
          Book an appointment
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', p: 2 }}>
        <Box sx={{ mt: -2 }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticDatePicker
              value={date}
              showDaysOutsideCurrentMonth
              disablePast
              onChange={onDatePicked}
              slots={{ actionBar: () => null, toolbar: () => null }}
              views={['day']}
              slotProps={{ layout: {} }}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ mx: 2, minWidth: 300, flex: 1 }}>
          <Field
            variant="outlined"
            labelml={2}
            component={Dropdown}
            name="start"
            label="Available appointments"
            options={appointments}
            fullWidth
            disabled={!appointments.length}
            error={
              !appointments.length
                ? 'No appointments are available on the selected date'
                : ''
            }
          />
        </Box>
        <SubmitButton
          disabled={!values.start}
          sx={{ ml: 2, alignSelf: 'end' }}
          variant="contained"
          size="large"
        >
          Book Appointment
        </SubmitButton>
      </Box>
    </Container>
  );
};
Appointment.propTypes = {
  date: PropTypes.instanceOf(moment),
  setDate: PropTypes.func,
};

export default Appointment;

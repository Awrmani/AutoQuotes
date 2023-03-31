import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Container, Paper } from '@mui/material';
import { fetchAppointmentOptions } from '../../actions';
import { getAppointmentOptions } from '../../reducers/queriesReducer';

const Appointment = () => {
  const { quoteId } = useParams();
  const dispatch = useDispatch();
  const appointmentOptions = useSelector(getAppointmentOptions);
  console.log(appointmentOptions);
  const onDatePicked = useCallback(
    value => {
      dispatch(
        fetchAppointmentOptions({
          quoteId,
          date: new Date(value._d).toISOString(),
        })
      );
    },
    [dispatch, quoteId]
  );

  const onBookAppointment = () => {
    console.log('booked');
  };

  return (
    <Container component={Paper} sx={{ p: 2 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker disablePast onChange={onDatePicked} />
      </LocalizationProvider>
      <Button
        sx={{ ml: 2 }}
        onClick={onBookAppointment}
        variant="contained"
        size="large"
      >
        Book Appointment
      </Button>
    </Container>
  );
};

export default Appointment;

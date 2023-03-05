import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppointmentDetails from '../components/AppointmentDetails';
import { fetchAppointmentDetails } from '../actions';
import { getAppointmentDetailsQuery } from '../reducers/queriesReducer';

const AppointmentDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAppointmentDetails({ id }));
  }, [id, dispatch]);
  const appointmentDetailsQuery = useSelector(getAppointmentDetailsQuery);
  const { isFetching, result } = appointmentDetailsQuery;
  if (isFetching || result?.appointment.id !== id)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );
  return <AppointmentDetails />;
};

export default AppointmentDetailsScreen;

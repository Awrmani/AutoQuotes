import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import AppointmentList from '../components/AppointmentList';
import { fetchAppointmentList } from '../actions';
import { getAppointmentListQuery } from '../reducers/queriesReducer';

const AppointmentListScreen = () => {
  const dispatch = useDispatch();
  const [selectedDay] = useState(() => {
    const myDate = new Date();
    return new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
  });

  const [nextDay] = useState(() => {
    const myDate = new Date();
    return new Date(
      myDate.getFullYear(),
      myDate.getMonth(),
      myDate.getDate() + 10
    );
  });
  // Hook responsible for loading part list from the BE
  useEffect(() => {
    dispatch(
      fetchAppointmentList({
        from: selectedDay.toISOString(),
        to: nextDay.toISOString(),
      })
    );
  }, [dispatch, selectedDay, nextDay]);

  // Extract the list query from the redux store
  const appointmentListQuery = useSelector(getAppointmentListQuery);
  const { isFetching, result } = appointmentListQuery ?? {};

  // DO not render while data is fetching from the BE
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return <AppointmentList />;
};

export default AppointmentListScreen;

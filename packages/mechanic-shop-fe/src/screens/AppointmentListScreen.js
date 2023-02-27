import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import AppointmentList from '../components/AppointmentList';
import { fetchAppointmentList, fetchShopSettings } from '../actions';
import {
  getAppointmentListQuery,
  getShopSettingsQuery,
} from '../reducers/queriesReducer';

const AppointmentListScreen = () => {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState(() => {
    const myDate = new Date();
    return new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
  });

  useEffect(() => {
    dispatch(fetchShopSettings());
  }, [dispatch]);

  useEffect(() => {
    const nextDay = new Date(
      selectedDay.getFullYear(),
      selectedDay.getMonth(),
      selectedDay.getDate() + 1
    );
    dispatch(
      fetchAppointmentList({
        from: selectedDay.toISOString(),
        to: nextDay.toISOString(),
      })
    );
  }, [dispatch, selectedDay]);

  // Extract the list query from the redux store
  const appointmentListQuery = useSelector(getAppointmentListQuery);
  const { result } = appointmentListQuery ?? {};
  // Extract the details from the redux store
  const shopSettingsQuery = useSelector(getShopSettingsQuery);
  const { isFetching: isShopSettingFetching, result: shopSettingResult } =
    shopSettingsQuery ?? {};

  // DO not render while data is fetching from the BE
  if (isShopSettingFetching || !shopSettingResult || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return (
    <AppointmentList
      setSelectedDay={setSelectedDay}
      selectedDay={selectedDay}
    />
  );
};

export default AppointmentListScreen;

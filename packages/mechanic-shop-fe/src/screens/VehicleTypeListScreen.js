import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import VehicleTypeList from '../components/VehicleTypeList';
import { fetchVehicleTypeList } from '../actions';
import { getVehicleTypeListQuery } from '../reducers/queriesReducer';

const VehicleTypeListScreen = () => {
  const dispatch = useDispatch();

  // Hook responsible for loading vehicletype list from the BE
  useEffect(() => {
    dispatch(fetchVehicleTypeList());
  }, [dispatch]);

  // Extract the list query from the redux store
  const vehicletypeListQuery = useSelector(getVehicleTypeListQuery);
  const { isFetching, result } = vehicletypeListQuery ?? {};

  // DO not render while data is fetching from the BE
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return <VehicleTypeList />;
};

export default VehicleTypeListScreen;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import ServiceList from '../components/ServiceList';
import { fetchServiceList } from '../actions';
import { getServiceListQuery } from '../reducers/queriesReducer';

const ServiceListScreen = () => {
  const dispatch = useDispatch();

  // Hook responsible for loading part list from the BE
  useEffect(() => {
    dispatch(fetchServiceList());
  }, [dispatch]);

  // Extract the list query from the redux store
  const serviceListQuery = useSelector(getServiceListQuery);
  const { isFetching, result } = serviceListQuery ?? {};

  // DO not render while data is fetching from the BE
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return <ServiceList />;
};

export default ServiceListScreen;

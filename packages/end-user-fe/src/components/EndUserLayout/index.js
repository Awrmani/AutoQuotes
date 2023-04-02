import React, { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Stack,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EndUserFooter from './EndUserFooter';
import EndUserAppBar from './EndUserAppBar';

import { fetchShopSettings } from '../../actions';
import { getShopSettingsQuery } from '../../reducers/queriesReducer';

const EndUserLayout = () => {
  const dispatch = useDispatch();

  // Hook responsible for loading part list from the BE
  useEffect(() => {
    dispatch(fetchShopSettings());
  }, [dispatch]);

  // Extract the list query from the redux store
  const ShopSettingsQuery = useSelector(getShopSettingsQuery);
  const { isFetching, result } = ShopSettingsQuery ?? {};

  // DO not render while data is fetching from the BE
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return (
    <Stack sx={{ mt: 0, minHeight: '100vh' }}>
      <Box sx={{ minHeight: '5vh' }}>
        <EndUserAppBar />
      </Box>

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 1,
          flex: 1,
        }}
      >
        <Outlet />
      </Container>

      <Box
        sx={{
          mt: 3,
          width: '100%',
          position: 'static',
          bottom: 0,
        }}
      >
        <Divider sx={{ borderWidth: 1 }} />
        <EndUserFooter />
      </Box>
    </Stack>
  );
};

export default EndUserLayout;

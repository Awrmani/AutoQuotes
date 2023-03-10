import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Container, Stack } from '@mui/material';
import { DRAWER_WIDTH } from '../../constants/layout';
import SideBar from './SideBar';

import { fetchShopSettings } from '../../actions';
import { getShopSettingsQuery } from '../../reducers/queriesReducer';

const ShopLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShopSettings());
  }, [dispatch]);
  const shopSettingsQuery = useSelector(getShopSettingsQuery);
  const { isFetching: isShopSettingFetching, result: shopSettingResult } =
    shopSettingsQuery ?? {};

  // DO not render while data is fetching from the BE
  if (isShopSettingFetching || !shopSettingResult)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );
  return (
    <>
      <SideBar />
      <Box
        sx={{
          ml: `${DRAWER_WIDTH}px`,
          mt: 6,
        }}
      >
        <Container
          sx={{ display: 'flex', justifyContent: 'center' }}
          data-testid="page-content"
        >
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default ShopLayout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { DRAWER_WIDTH } from '../../constants/layout';
import SideBar from './SideBar';

const ShopLayout = () => {
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

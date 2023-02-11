import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import SideBar from './SideBar';

const ShopLayout = () => {
  return (
    <Container sx={{ display: 'flex' }}>
      <SideBar />
      <Container>
        <Outlet />
      </Container>
    </Container>
  );
};

export default ShopLayout;

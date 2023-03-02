import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const EndUserLayout = () => {
  return (
    <>
      <Box>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default EndUserLayout;

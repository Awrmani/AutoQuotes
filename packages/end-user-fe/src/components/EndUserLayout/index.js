import React from 'react';
import { Box, Container, Divider, Stack } from '@mui/material';

import { Outlet } from 'react-router-dom';
import EndUserFooter from './EndUserFooter';
import EndUserAppBar from './EndUserAppBar';

const EndUserLayout = () => {
  return (
    <Stack>
      <EndUserAppBar />
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </Container>

      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          justifySelf: 'center',
        }}
      >
        <Divider sx={{ borderWidth: 1 }} />
        <EndUserFooter />
      </Box>
    </Stack>
  );
};

export default EndUserLayout;

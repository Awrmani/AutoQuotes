import { Box, Container, Divider, Paper } from '@mui/material';
import React from 'react';
import VehicleInfo from './VehicleInfo';

const EndUserQuotingPage = () => {
  return (
    <Container component={Paper}>
      <Box sx={{ my: 2 }}>
        <VehicleInfo />
        <Divider sx={{ mt: 2 }} />
      </Box>
      <div>End-user front-end</div>
    </Container>
  );
};

export default EndUserQuotingPage;

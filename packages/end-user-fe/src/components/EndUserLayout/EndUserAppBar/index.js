import { Box, Container } from '@mui/material';
import React from 'react';

const EndUserAppBAr = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>Link 1</Box>
      <Box>Link 2</Box>
      <Box>Link 3</Box>
      <Box>Link 4</Box>
    </Container>
  );
};

export default EndUserAppBAr;

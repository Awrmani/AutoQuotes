import React from 'react';
import { Box } from '@mui/material';
import Car from '../components/icons/Car';

const ShopDashboardScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        color: '#F8F8F8',
        width: '100%',
      }}
    >
      <Car width="60%" />
    </Box>
  );
};

export default ShopDashboardScreen;

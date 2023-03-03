import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const PoweredBy = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        spacing={0}
        sx={{
          paddingLeft: 2,
          justifyItems: 'left',
        }}
      >
        <Typography
          sx={{
            m: 0,
            letterSpacing: 0,
          }}
          fontSize="small"
          align="center"
        >
          Powered by Auto Quotes Corp.
        </Typography>
      </Stack>
    </Box>
  );
};

export default PoweredBy;

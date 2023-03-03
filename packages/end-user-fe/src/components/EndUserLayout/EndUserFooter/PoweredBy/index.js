import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const PoweredBy = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        spacing={0}
        sx={{
          padding: 1,
          justifyItems: 'left',
        }}
      >
        <Box sx={{ my: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography
            component={'span'}
            color="primary.main"
            sx={{ my: 0, textAlign: 'center', border: 1, px: 1 }}
          >
            Powered by
          </Typography>
        </Box>
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

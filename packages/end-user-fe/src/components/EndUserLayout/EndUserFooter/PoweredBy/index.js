import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import FooterTitleBox from '../FooterTitleBox';

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
        <FooterTitleBox title={'Powered by'} />
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

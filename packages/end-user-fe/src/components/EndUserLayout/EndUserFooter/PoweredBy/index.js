import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import FooterTitleBox from '../FooterTitleBox';

const PoweredBy = () => {
  return (
    <Stack
      spacing={0}
      sx={{
        padding: 1,
        alignItems: 'center',
      }}
    >
      <FooterTitleBox title={'Powered by'} />
      <Avatar sx={{ my: 2, width: 56, height: 56 }} variant="square">
        AQ
      </Avatar>
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
  );
};

export default PoweredBy;

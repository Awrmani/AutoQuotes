import { DateRange, Weekend } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import FooterTitleBox from '../FooterTitleBox';

const OpeningHours = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        spacing={0}
        sx={{
          padding: 1,
          justifyItems: 'left',
        }}
      >
        <FooterTitleBox title={'Opening Hours'}></FooterTitleBox>
        <IconButton
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <DateRange sx={{ mr: 1 }} />
          <Typography noWrap color="inherit" fontSize="small">
            Weekdays:
          </Typography>
        </IconButton>
        <IconButton
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <Weekend sx={{ mr: 1 }} />
          <Typography noWrap color="inherit" fontSize="small">
            Weekends:
          </Typography>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default OpeningHours;

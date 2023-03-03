import { DateRange, Weekend } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

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
        <Box sx={{ my: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography
            component={'span'}
            color="primary.main"
            sx={{ my: 0, textAlign: 'center', border: 1, px: 1 }}
          >
            Opening Hours
          </Typography>
        </Box>
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

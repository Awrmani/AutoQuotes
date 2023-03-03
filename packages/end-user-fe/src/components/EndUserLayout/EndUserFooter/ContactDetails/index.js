import { LocationOn, Mail, Phone } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

import { buttonSx } from '../../../../constants/layout';

const ContactDetails = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        spacing={1}
        sx={{
          padding: 1,
          justifyItems: 'left',
        }}
      >
        <Box sx={{ my: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography
            color="primary.main"
            component={'span'}
            sx={{ my: 0, textAlign: 'center', border: 1, px: 1 }}
          >
            Contact Details
          </Typography>
        </Box>
        <IconButton
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <Mail sx={{ mr: 1 }} />
          <Typography
            noWrap
            color="inherit"
            component="a"
            href={'#'}
            underline="none"
            sx={buttonSx}
            fontSize="small"
          >
            autoquotes@gmail.com
          </Typography>
        </IconButton>

        <IconButton
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <Phone sx={{ mr: 1 }} />
          <Typography
            color="inherit"
            component="a"
            href={'#'}
            underline="none"
            sx={buttonSx}
            fontSize="small"
          >
            {'+1 (234) 457 8910'}
          </Typography>
        </IconButton>

        <IconButton
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <LocationOn sx={{ mr: 1 }} />
          <Typography
            color="inherit"
            component="a"
            href={'#'}
            underline="none"
            sx={buttonSx}
            fontSize="small"
          >
            A1750 Finch Avenue East Toronto, Ontario, Canada M2J 2X5
          </Typography>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ContactDetails;

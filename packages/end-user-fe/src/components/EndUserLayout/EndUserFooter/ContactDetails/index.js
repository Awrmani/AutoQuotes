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
          paddingLeft: 2,
          justifyItems: 'left',
        }}
      >
        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography
            color="primary.main"
            variant="h6"
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
            fontSize="medium"
          >
            A1750 Finch Avenue East Toronto, Ontario, Canada M2J 2X5
          </Typography>
        </IconButton>
        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="body2"
            component={'span'}
            color="primary.main"
            sx={{ my: 0, textAlign: 'center', border: 1, px: 1 }}
          >
            Opening hours
          </Typography>
        </Box>
        <Typography sx={{ ml: 2, my: 0, textAlign: 'left' }}>
          Weekdays:
          <Typography variant="subtitle1" component={'span'}>
            {' hours go here'}
          </Typography>
        </Typography>
        <Typography sx={{ ml: 2, my: 0, textAlign: 'left' }}>
          Weekends:
          <Typography component={'span'}>{' hours go here'}</Typography>
        </Typography>
      </Stack>
    </Box>
  );
};

export default ContactDetails;

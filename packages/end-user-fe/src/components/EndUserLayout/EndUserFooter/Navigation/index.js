import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ContactSupport, RequestQuote } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { buttonSx } from '../../../../constants/layout';
import paths from '../../../../paths';

const Navigation = () => {
  const navigate = useNavigate();
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
            component={'span'}
            color="primary.main"
            sx={{ my: 0, textAlign: 'center', border: 1, px: 1 }}
          >
            Navigation
          </Typography>
        </Box>

        <IconButton
          onClick={() => navigate(paths.quotingPage())}
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <RequestQuote sx={{ mr: 1 }} />
          <Typography noWrap color="inherit" sx={buttonSx} fontSize="small">
            Get a quote
          </Typography>
        </IconButton>
        <IconButton
          onClick={() => navigate(paths.quotingPage())}
          color="inherit"
          edge="start"
          disableRipple
          sx={{ justifyContent: 'left', m: 0, p: 0 }}
        >
          <ContactSupport sx={{ mr: 1 }} />
          <Typography noWrap color="inherit" sx={buttonSx} fontSize="small">
            About us
          </Typography>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Navigation;

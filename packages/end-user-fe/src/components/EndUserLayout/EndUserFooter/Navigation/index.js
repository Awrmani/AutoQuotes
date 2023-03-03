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
          paddingLeft: 2,
          justifyItems: 'left',
        }}
      >
        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="h6"
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
          <Typography color="inherit" sx={buttonSx} fontSize="medium">
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
          <Typography color="inherit" sx={buttonSx} fontSize="medium">
            About us
          </Typography>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Navigation;

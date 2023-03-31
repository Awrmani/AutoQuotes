import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ContactSupport, RequestQuote } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

import paths from '../../../../paths';
import ItemButton from '../ItemButton';
import FooterTitleBox from '../FooterTitleBox';

const Navigation = () => {
  const navigate = useNavigate();
  const NavigationElements = [
    {
      title: 'Get a quote',
      icon: <RequestQuote sx={{ mr: 1 }} />,
      onclick: () => navigate(paths.quotingPage({})),
    },
    {
      title: 'About us',
      icon: <ContactSupport sx={{ mr: 1 }} />,
      onclick: () => navigate(paths.about()),
    },
  ];

  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        spacing={1}
        sx={{
          padding: 1,
          justifyItems: 'left',
        }}
      >
        <FooterTitleBox title={'Navigation'} />

        {NavigationElements.map(e => {
          return (
            <ItemButton
              key={e.title}
              title={e.title}
              icon={e.icon}
              onclick={e.onclick}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default Navigation;

import { AssignmentReturn, Gavel, Shield } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import React from 'react';
import paths from '../../../../paths';
import FooterIconButton from '../FooterIconButton';
import FooterTitleBox from '../FooterTitleBox';

const TermsServices = () => {
  const navigate = useNavigate();
  const termsServicesElements = [
    {
      title: 'Privacy Policy',
      icon: <Shield sx={{ mr: 1 }} />,
      onclick: () => navigate(paths.quotingPage()),
    },
    {
      title: 'Return Policy',
      icon: <AssignmentReturn sx={{ mr: 1 }} />,
      onclick: () => navigate(paths.quotingPage()),
    },
    {
      title: 'Terms and Conditions',
      icon: <Gavel sx={{ mr: 1 }} />,
      onclick: () => navigate(paths.quotingPage()),
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
        <FooterTitleBox title={'Terms and Services'}></FooterTitleBox>
        {termsServicesElements.map(e => {
          return (
            <FooterIconButton
              key={e.title}
              title={e.title}
              icon={e.icon}
              onclick={e.onclick}
            ></FooterIconButton>
          );
        })}
      </Stack>
    </Box>
  );
};

export default TermsServices;

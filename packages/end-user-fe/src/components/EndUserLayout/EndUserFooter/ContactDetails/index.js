import { LocationOn, Mail, Phone } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import React from 'react';
import FooterTitleBox from '../FooterTitleBox';
import ItemLink from '../ItemLink';

const ContactDetails = () => {
  const contactDetailsElements = [
    {
      title: 'autoquotes@gmail.com',
      href: `mailto:autoquotes@gmail.com`,
      icon: <Mail sx={{ mr: 1 }} />,
    },
    {
      title: '+1 (234) 457 8910',
      href: `tel:+1 (234) 457 8910`,
      icon: <Phone sx={{ mr: 1 }} />,
    },
    {
      title: 'A1750 Finch Avenue East Toronto, Ontario, Canada M2J 2X5',
      href: `https://www.google.com/search?q=${encodeURIComponent(
        'A1750 Finch Avenue East Toronto, Ontario, Canada M2J 2X5'
      )}`,
      icon: <LocationOn sx={{ mr: 1 }} />,
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
        <FooterTitleBox title={'Contact details'} />
        {contactDetailsElements.map(e => {
          return (
            <ItemLink
              key={e.title}
              title={e.title}
              href={e.href}
              icon={e.icon}
            ></ItemLink>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ContactDetails;

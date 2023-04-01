import { LocationOn, Mail, Phone } from '@mui/icons-material';
import { Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import FooterTitleBox from '../FooterTitleBox';
import ItemLink from '../ItemLink';

import { getShopSettings } from '../../../../reducers/queriesReducer';

const ContactDetails = () => {
  const shopDetails = useSelector(getShopSettings);
  const { phone, email, address1, address2, zip, city, state, country } =
    shopDetails;

  const contactDetailsElements = useMemo(() => {
    const address = `${
      address2 !== '' ? `${address2},` : ''
    } ${address1}, ${city}, ${state}, ${country}, ${zip}`;
    return [
      {
        title: `${email}`,
        href: `mailto:${email}`,
        icon: <Mail sx={{ mr: 1 }} />,
      },
      {
        title: `${phone}`,
        href: `tel:${phone}`,
        icon: <Phone sx={{ mr: 1 }} />,
      },
      {
        title: `${address}`,
        href: `https://www.google.com/search?q=${encodeURIComponent(
          `${address}`
        )}`,
        icon: <LocationOn sx={{ mr: 1 }} />,
      },
    ];
  }, [phone, email, address1, address2, zip, city, state, country]);

  return (
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
  );
};

export default ContactDetails;

import { AssignmentReturn, Gavel, Shield } from '@mui/icons-material';
import { Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import FooterTitleBox from '../FooterTitleBox';

import { getShopSettings } from '../../../../reducers/queriesReducer';
import ItemLink from '../ItemLink';

const TermsServices = () => {
  const shopDetails = useSelector(getShopSettings);
  const { returnPolicyUrl, termsAndConditionsUrl, privacyPolicyUrl } =
    shopDetails;

  const termsServicesElements = useMemo(() => {
    return [
      {
        title: 'Privacy Policy',
        icon: <Shield sx={{ mr: 1 }} />,
        href: privacyPolicyUrl,
      },
      {
        title: 'Return Policy',
        icon: <AssignmentReturn sx={{ mr: 1 }} />,
        href: returnPolicyUrl,
      },
      {
        title: 'Terms and Conditions',
        icon: <Gavel sx={{ mr: 1 }} />,
        href: termsAndConditionsUrl,
      },
    ];
  }, [returnPolicyUrl, termsAndConditionsUrl, privacyPolicyUrl]);

  return (
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
          <ItemLink
            key={e.title}
            title={e.title}
            icon={e.icon}
            href={e.href}
          ></ItemLink>
        );
      })}
    </Stack>
  );
};

export default TermsServices;

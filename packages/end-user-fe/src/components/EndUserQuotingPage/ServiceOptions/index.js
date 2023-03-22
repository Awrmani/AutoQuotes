import { Box, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { Field, SubmitButton } from '@autoquotes/common/src/components/Form';
import Dropdown from '@autoquotes/common/src/components/Dropdown';
import { SELECTOR_WIDTH } from '../../../constants/comDimension';

import { getServiceTypeList } from '../../../reducers/queriesReducer';

const ServiceOptions = () => {
  const serviceList = useSelector(getServiceTypeList);

  const services = useMemo(() => {
    if (serviceList) {
      return serviceList.map(s => ({
        value: s.id,
        label: s.name,
      }));
    }
    return [{ value: '', label: '' }];
  }, [serviceList]);
  return (
    <Container>
      <Typography component="h1" variant="h5">
        Service Options
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'left', m: 2 }}>
        <Box sx={{ minWidth: SELECTOR_WIDTH }}>
          <Field
            component={Dropdown}
            name="service"
            label="Service"
            fullWidth
            options={services}
          />
        </Box>
        <SubmitButton sx={{ ml: 10 }} variant="contained" size="large">
          Add Service
        </SubmitButton>
      </Box>
    </Container>
  );
};

export default ServiceOptions;

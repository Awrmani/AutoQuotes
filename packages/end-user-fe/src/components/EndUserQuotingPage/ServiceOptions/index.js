import { Box, Container, Typography } from '@mui/material';
import { Field } from '@autoquotes/common/src/components/Form';
import Dropdown from '@autoquotes/common/src/components/Dropdown';
import { SELECTOR_WIDTH } from '../../../constants/comDimension';

const ServiceOptions = () => {
  return (
    <Container>
      <Typography component="h1" variant="h5">
        Service Options
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ minWidth: SELECTOR_WIDTH }}>
          <Field
            component={Dropdown}
            name="service"
            label="Service"
            fullWidth
            options={[]}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ServiceOptions;

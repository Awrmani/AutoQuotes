import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  SubmitButton,
  FormError,
} from '@autoquotes/common/src/components/Form';
import TextInput from '@autoquotes/common/src/components/TextInput';
import { Container, Grid, Typography } from '@mui/material';

const EditVehicleTypeForm = props => {
  return (
    <Container sx={{ mt: 2, width: '80%' }}>
      <Typography variant="h6" gutterBottom>
        {props.edit ? 'Update Type' : 'Create Type'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="make"
            label="Make"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="model"
            label="Model"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="modelYear"
            label="Model Year"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="engineVariant"
            label="Engine Variant"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="bodyType"
            label="Body Type"
            fullWidth
          />
        </Grid>
        <FormError />
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={3}>
          <SubmitButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            data-testid="submitButton"
          >
            {props.edit ? 'Update' : 'Create'}
          </SubmitButton>
        </Grid>
      </Grid>
    </Container>
  );
};

EditVehicleTypeForm.propTypes = {
  edit: PropTypes.bool,
};

EditVehicleTypeForm.defaultProps = {
  edit: false,
};

export default EditVehicleTypeForm;

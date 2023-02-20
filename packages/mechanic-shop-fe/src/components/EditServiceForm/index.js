import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  SubmitButton,
  FormError,
} from '@autoquotes/common/src/components/Form';
import TextInput from '@autoquotes/common/src/components/TextInput';
import { Container, Grid, Typography } from '@mui/material';

const EditServiceForm = props => {
  return (
    <Container sx={{ mt: 2, width: '80%' }}>
      <Typography variant="h6" gutterBottom>
        {props.edit ? 'Update Service' : 'Create Service'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            required
            autoFocus
            component={TextInput}
            name="name"
            label="Service name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="timeInMinutes"
            label="Duration(minutes)"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="description"
            label="Description"
            fullWidth
            variant="standard"
          />
        </Grid>
        <FormError />
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={3}>
          <SubmitButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {props.edit ? 'Update' : 'Create'}
          </SubmitButton>
        </Grid>
      </Grid>
    </Container>
  );
};

EditServiceForm.propTypes = {
  edit: PropTypes.bool,
};

EditServiceForm.defaultProps = {
  edit: false,
};

export default EditServiceForm;
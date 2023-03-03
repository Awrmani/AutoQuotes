import React from 'react';
import {
  Field,
  SubmitButton,
  FormError,
} from '@autoquotes/common/src/components/Form';
import TextInput from '@autoquotes/common/src/components/TextInput';
import Dropdown from '@autoquotes/common/src/components/Dropdown';
import { Container, Grid, Typography } from '@mui/material';

const roleOptions = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Employee',
    value: 'employee',
  },
];

const UserProfile = () => {
  return (
    <Container sx={{ mt: 2, width: '80%' }}>
      <Typography variant="h6" gutterBottom>
        {'Your Profile'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="name"
            label="Full Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="email"
            label="Email"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="phone"
            label="Phone Number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="password"
            label="Password"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={Dropdown}
            name="role"
            label="User Role"
            fullWidth
            options={roleOptions}
          />
        </Grid>
        <FormError />
        <Grid item xs={12} sm={3}>
          <SubmitButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {'Update'}
          </SubmitButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;

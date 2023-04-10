import React, { Fragment } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { DAY_OPTIONS } from '@autoquotes/libraries/src/constants/days';
import {
  Field,
  SubmitButton,
  FormError,
} from '@autoquotes/common/src/components/Form';
import ImageInput from '@autoquotes/common/src/components/ImageInput';
import TextInput from '@autoquotes/common/src/components/TextInput';

const ShopSettingsForm = () => {
  return (
    <Container sx={{ mt: 2, width: '80%' }}>
      <Typography variant="h5" gutterBottom>
        Update Shop Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="name"
            label="Name of the shop"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field component={ImageInput} name="logo" label="Logo" />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="slogan"
            label="Slogan"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="numberOfStalls"
            label="Number of stalls"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="hourlyPriceOfLabor"
            label="Hourly price of labor"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="partMarkupPercent"
            label="Third party part markup %"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="taxPercent"
            label="Tax %"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} marginTop={4}>
          <Typography variant="h6" gutterBottom>
            Contact & Address
          </Typography>
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
            label="Phone"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            required
            component={TextInput}
            name="address1"
            label="Address line 1"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            component={TextInput}
            name="address2"
            label="Address line 2"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="zip"
            label="Postal code"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="city"
            label="City"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="state"
            label="State"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            component={TextInput}
            name="country"
            label="Country"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} marginTop={4}>
          <Typography variant="h6" gutterBottom>
            Legal
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="returnPolicyUrl"
            label="Return policy URL"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="termsAndConditionsUrl"
            label="Terms and conditions URL"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            name="privacyPolicyUrl"
            label="privacy policy URL"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} marginTop={4}>
          <Typography variant="h6" gutterBottom>
            Opening Hours
          </Typography>
        </Grid>
        {DAY_OPTIONS.map(({ label, key }) => (
          <Fragment key={key}>
            <Grid item xs={3} data-testid={`openingHours-${key}-openHour`}>
              <Field
                component={TextInput}
                name={`openingHours.${key}.openHour`}
                label={`${label} open hour`}
                fullWidth
              />
            </Grid>
            <Grid item xs={3} data-testid={`openingHours-${key}-openMinute`}>
              <Field
                component={TextInput}
                name={`openingHours.${key}.openMinute`}
                label={`Open minute`}
                fullWidth
              />
            </Grid>
            <Grid item xs={3} data-testid={`openingHours-${key}-closeHour`}>
              <Field
                component={TextInput}
                name={`openingHours.${key}.closeHour`}
                label={`Close hour`}
                fullWidth
              />
            </Grid>
            <Grid item xs={3} data-testid={`openingHours-${key}-closeMinute`}>
              <Field
                component={TextInput}
                name={`openingHours.${key}.closeMinute`}
                label={`Close minute`}
                fullWidth
              />
            </Grid>
          </Fragment>
        ))}
        <Grid item xs={12}>
          <FormError />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SubmitButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            data-testid="submitButton"
          >
            Update
          </SubmitButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopSettingsForm;

import {
  Field,
  SubmitButton,
  FormError,
} from '@autoquotes/common/src/components/Form';
import TextInput from '@autoquotes/common/src/components/TextInput';
import { Container, Grid, Typography } from '@mui/material';

const EditPartForm = props => {
  return (
    <Container sx={{ mt: 2, width: '80%' }}>
      <Typography variant="h6" gutterBottom>
        Create a new item
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            required
            autoFocus
            component={TextInput}
            id="name"
            name="name"
            label="Item name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            id="price"
            name="price"
            label="Price"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            id="amountInStock"
            name="amountInStock"
            label="Quantity"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            component={TextInput}
            id="compatibleVehicles"
            name="compatibleVehicles"
            label="Compatible Vehicles"
            fullWidth
            variant="standard"
          />
        </Grid>
        <FormError />
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <SubmitButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create
          </SubmitButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditPartForm;

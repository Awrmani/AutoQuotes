import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { getAppointmentDetails } from '../../reducers/queriesReducer';
import { deleteAppointment } from '../../actions';
import paths from '../../paths';

const AppointmentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appointment, customer, quote } = useSelector(getAppointmentDetails);
  const { address1, address2, city, country, state, zip } =
    customer.billingInformation;
  const address = `${
    address2 !== '' ? `${address2},` : ''
  } ${address1}, ${city}, ${state}, ${country}, ${zip}`;

  const handleDeleteClick = useCallback(
    id => {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to cancel the appointment?')) {
        dispatch(deleteAppointment({ id }));
        navigate(paths.appointmentList());
      }
    },
    [dispatch, navigate]
  );
  return (
    <Container sx={{ mt: 2, width: '80%' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Appointment Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h6">
            Date: &nbsp;
            <Typography variant="h6" component="span" color="primary.main">
              {moment(appointment.startsAt).format('MM/DD/YYYY')}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">
            From: &nbsp;
            <Typography variant="h6" component="span" color="primary.main">
              {moment(appointment.startsAt).format('h:mm a')}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">
            To: &nbsp;
            <Typography variant="h6" component="span" color="primary.main">
              {moment(appointment.startsAt)
                .add(appointment.duration, 'minutes')
                .format('h:mm a')}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">
            Stall number:&nbsp;
            <Typography variant="h6" component="span" color="primary.main">
              {appointment.stall}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Customer Information
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: 'primary.light' }}>
            <TableRow>
              <TableCell
                sx={{ color: 'white', fontSize: 'medium' }}
                width={160}
                align="left"
              >
                Title
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: 'medium' }}>
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left" width={160}>
                Customer Name
              </TableCell>
              <TableCell align="left">{customer.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" width={160}>
                Mailing Address
              </TableCell>
              <TableCell align="left">{address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" width={160}>
                Email Address
              </TableCell>
              <TableCell align="left">{customer.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" width={160}>
                Phone Number
              </TableCell>
              <TableCell align="left">{customer.phone}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Service Details for&nbsp;
        <Typography variant="h6" component="span">
          {quote.vehicleTypeId}
        </Typography>
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: 'primary.light' }}>
            <TableRow>
              <TableCell
                sx={{ color: 'white', fontSize: 'medium' }}
                width={160}
                align="left"
              >
                Services
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: 'medium' }}>
                {' '}
                Parts
              </TableCell>
            </TableRow>
          </TableHead>
          {quote.lineItems.map(item => {
            return (
              <TableBody>
                <TableRow>
                  <TableCell
                    width={160}
                    align="left"
                    rowSpan={item.parts.length + 1}
                  >
                    {item.serviceTypeId}
                  </TableCell>
                </TableRow>
                {item.parts.map(part => {
                  return (
                    <TableRow>
                      <TableCell align="left">{part}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            );
          })}
        </Table>
      </TableContainer>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          size="medium"
          variant="contained"
          color="error"
          sx={{ mt: 2, mb: 2 }}
          onClick={() => handleDeleteClick(appointment.id)}
        >
          Cancel Appointment
        </Button>
      </Container>
    </Container>
  );
};

export default AppointmentDetails;

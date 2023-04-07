import PropTypes from 'prop-types';
import moment from 'moment';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';

const AppointmentDetails = ({ appointment }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Container>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Appointment Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography>
              Date: &nbsp;
              <Typography component="span" color="primary.main">
                {moment(appointment.startsAt).format('MM/DD/YYYY')}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              Duration:&nbsp;
              <Typography component="span" color="primary.main">
                {`${(appointment.duration / 60).toFixed(2)} hours`}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              From: &nbsp;
              <Typography component="span" color="primary.main">
                {moment(appointment.startsAt).format('h:mm a')}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              To: &nbsp;
              <Typography component="span" color="primary.main">
                {moment(appointment.endsAt).format('h:mm a')}
              </Typography>
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography>
              Stall number:&nbsp;
              <Typography component="span" color="primary.main">
                {String(appointment.stall).padStart(2, 0)}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

AppointmentDetails.propTypes = {
  appointment: PropTypes.shape({
    startsAt: PropTypes.string.isRequired,
    endsAt: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    stall: PropTypes.number.isRequired,
  }).isRequired,
};

export default AppointmentDetails;

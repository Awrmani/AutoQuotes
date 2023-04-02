import { MarkEmailRead } from '@mui/icons-material';
import { Button, Container, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import paths from '../../paths';

const ConfirmingEmail = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 10,
        width: '40%',
        height: '50vh',
      }}
      component={Paper}
    >
      <MarkEmailRead sx={{ fontSize: 100, color: green[800] }}></MarkEmailRead>
      <Typography variant="h5"> Confirm your email address</Typography>
      <Typography> We've sent a confirmation email to you</Typography>
      <Typography>
        Check your email and click on the confirmation link to continue
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate(paths.quotingPage({}))}
      >
        Quoting Page
      </Button>
    </Container>
  );
};

export default ConfirmingEmail;

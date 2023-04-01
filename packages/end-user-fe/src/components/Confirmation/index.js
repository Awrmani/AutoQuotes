import { CheckCircle } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '@autoquotes/libraries/src/reducers/tokenReducer';
import { confirmUser } from '../../actions';
import paths from '../../paths';

const Confirmation = () => {
  const { userId, key } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(confirmUser({ userId, key }));
  }, [userId, key, dispatch]);

  const token = useSelector(getToken);
  useEffect(() => {
    if (token) navigate(paths.quotingPage({}));
  }, [token, navigate]);
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
      <CheckCircle sx={{ fontSize: 100, color: green[800] }}></CheckCircle>

      <Box sx={{ display: 'flex', color: grey[900], justifyContent: 'center' }}>
        <CircularProgress sx={{ mr: 1, color: grey[900] }} size={20} />
        <Typography> Verifying your email</Typography>
      </Box>
    </Container>
  );
};

export default Confirmation;

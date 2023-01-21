import { createTheme } from '@mui/material/styles';
import typography from './typography';
import palette from './palette';
import components from './components';

const theme = createTheme({
  typography,
  palette,
  components,
});

export default theme;

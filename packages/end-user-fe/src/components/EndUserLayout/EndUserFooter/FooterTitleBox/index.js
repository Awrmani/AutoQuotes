import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const FooterTitleBox = ({ title }) => {
  return (
    <Box sx={{ my: 1, display: 'flex', justifyContent: 'center' }}>
      <Typography
        noWrap
        component={'span'}
        color="primary.main"
        sx={{ my: 0, textAlign: 'center', border: 1, px: 1 }}
      >
        {title}
      </Typography>
    </Box>
  );
};

FooterTitleBox.propTypes = {
  title: PropTypes.string,
};

export default FooterTitleBox;

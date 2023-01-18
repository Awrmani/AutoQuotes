import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const FieldError = ({ error, ...rest }) => {
  if (!error) return null;

  return (
    <Typography variant="danger" component="div" {...rest}>
      {error}
    </Typography>
  );
};

FieldError.propTypes = {
  error: PropTypes.string,
};

FieldError.defaultProps = {
  error: undefined,
};

export default FieldError;

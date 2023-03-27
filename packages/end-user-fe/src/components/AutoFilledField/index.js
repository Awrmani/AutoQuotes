import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, Typography } from '@mui/material';

const AutoFilledField = ({ options, value }) => {
  const option = options.find(({ id: toCheck }) => toCheck === value);
  return (
    <>
      <TableCell align="right">
        <Typography>{option.price}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>{value}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>{value}</Typography>
      </TableCell>
    </>
  );
};

AutoFilledField.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  description: PropTypes.string,
  isSubmitting: PropTypes.bool,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

AutoFilledField.defaultProps = {
  error: undefined,
  description: undefined,
  value: '',
  isSubmitting: false,
};

export default AutoFilledField;

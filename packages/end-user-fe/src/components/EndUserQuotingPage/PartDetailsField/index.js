import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, Typography } from '@mui/material';

const PartDetailsField = ({ options, value }) => {
  const option = options.find(({ id: toCheck }) => toCheck === value);

  return (
    <>
      <TableCell sx={{ width: '120px', borderBottom: 'none' }} align="right">
        <Typography>{option?.warrantyMonths}</Typography>
      </TableCell>
      <TableCell sx={{ width: '120px', borderBottom: 'none' }} align="right">
        <Typography>${option?.price}</Typography>
      </TableCell>
    </>
  );
};

PartDetailsField.propTypes = {
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

PartDetailsField.defaultProps = {
  error: undefined,
  description: undefined,
  value: '',
  isSubmitting: false,
};

export default PartDetailsField;

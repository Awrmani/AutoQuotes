import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@mui/material';
import { toCurrency } from '@autoquotes/libraries/src/utils/currency';

const PartDetailsField = ({ options, value }) => {
  const option = options.find(({ id: toCheck }) => toCheck === value);

  return (
    <>
      <TableCell
        sx={{
          fontSize: 'small',
          width: '120px',
          borderBottom: 'none',
          mb: 0,
        }}
        align="right"
      >
        {toCurrency(option?.price)}
      </TableCell>
      <TableCell
        sx={{
          fontSize: 'small',
          width: '120px',
          borderBottom: 'none',
          mb: 0,
        }}
        align="right"
      >
        {toCurrency(option?.partTax)}
      </TableCell>
      <TableCell
        sx={{
          fontSize: 'small',
          width: '120px',
          borderBottom: 'none',
          mb: 0,
        }}
        align="right"
      >
        {toCurrency((option?.price ?? 0) + (option?.partTax ?? 0))}
      </TableCell>
    </>
  );
};

PartDetailsField.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

PartDetailsField.defaultProps = {
  value: '',
};

export default PartDetailsField;

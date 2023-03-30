import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import { toCurrency } from '@autoquotes/libraries/src/utils/currency';
import { Delete } from '@mui/icons-material';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { removeService } from '../../../actions';
import SelectedPart from './SelectedPart';

const ServiceRow = ({ lineItemIndex }) => {
  const dispatch = useDispatch();
  const { values } = useContext(formContext);
  const { quoteId, lineItems } = values ?? {};
  const lineItem = lineItems[lineItemIndex];
  const { serviceTypeId, name, timeInMinutes, laborCost, requiredParts } =
    lineItem;
  const style = { width: '120px', fontSize: 'small', borderBottom: 'none' };

  const handleDeleteClick = useCallback(() => {
    dispatch(removeService({ quoteId, serviceTypeId }));
  }, [dispatch, quoteId, serviceTypeId]);

  return (
    <>
      <TableRow key={serviceTypeId} sx={{ px: 0, borderBottom: 'none' }}>
        <TableCell sx={{ borderBottom: 'none' }}>{lineItemIndex + 1}</TableCell>
        <TableCell
          sx={{ width: 300, borderBottom: 'none' }}
          component="th"
          scope="row"
        >
          {name}
        </TableCell>
        <TableCell sx={style} align="right">
          {(timeInMinutes / 60).toFixed(2)}
        </TableCell>
        <TableCell sx={style} align="right">
          {toCurrency(laborCost)}
        </TableCell>
        <TableCell
          sx={{ borderBottom: 'none', padding: 0, maxWith: 20 }}
          align="right"
        >
          <Tooltip title="Remove">
            <IconButton onClick={handleDeleteClick}>
              <Delete />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      {requiredParts.map((_, requiredPartIndex) => (
        <SelectedPart
          lineItemIndex={lineItemIndex}
          requiredPartIndex={requiredPartIndex}
        />
      ))}
      <TableRow>
        <TableCell colSpan={5}></TableCell>
      </TableRow>
    </>
  );
};

ServiceRow.propTypes = {
  lineItemIndex: PropTypes.number.isRequired,
};

export default ServiceRow;

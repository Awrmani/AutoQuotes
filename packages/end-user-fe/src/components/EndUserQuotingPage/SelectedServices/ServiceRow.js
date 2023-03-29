import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { removeService } from '../../../actions';
import SelectedPart from './SelectedPart';

const style = { width: '120px', borderBottom: 'none', fontSize: 'large' };

const ServiceRow = ({ lineItemIndex }) => {
  const dispatch = useDispatch();
  const { values } = useContext(formContext);
  const { quoteId, lineItems } = values ?? {};
  const lineItem = lineItems[lineItemIndex];
  const { serviceTypeId, name, timeInMinutes, laborCost, requiredParts } =
    lineItem;

  const handleDeleteClick = useCallback(() => {
    dispatch(removeService({ quoteId, serviceTypeId }));
  }, [dispatch, quoteId, serviceTypeId]);

  return (
    <>
      <TableRow key={serviceTypeId} sx={{ px: 0 }}>
        <TableCell sx={{ borderBottom: 'none', fontSize: 'large' }}>
          {lineItemIndex + 1}
        </TableCell>
        <TableCell
          sx={{ width: 300, borderBottom: 'none', fontSize: 'large' }}
          component="th"
          scope="row"
        >
          {name}
        </TableCell>
        <TableCell sx={style} align="right">
          {(timeInMinutes / 60).toFixed(2)}
        </TableCell>
        <TableCell sx={style} align="right">
          ${laborCost}
        </TableCell>
        <TableCell sx={{ width: 8, borderBottom: 'none' }} align="right">
          <Tooltip title="Remove">
            <IconButton onClick={handleDeleteClick}>
              <Delete />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={7}>
          <Box sx={{ mr: 7, ml: 14, mb: 2 }}>
            <Table size="small">
              <TableBody>
                {requiredParts.map((_, requiredPartIndex) => (
                  <SelectedPart
                    // key={SelectedPart}
                    lineItemIndex={lineItemIndex}
                    requiredPartIndex={requiredPartIndex}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

ServiceRow.propTypes = {
  lineItemIndex: PropTypes.number.isRequired,
};

export default ServiceRow;

import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { IconButton, Tooltip } from '@mui/material';
import TableRow from '@mui/material/TableRow';

import { Delete } from '@mui/icons-material';
import { Field } from '@autoquotes/common/src/components/Form';
import Dropdown from '@autoquotes/common/src/components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuoteDetails, removeService } from '../../../../actions';
import {
  getQuoteDetails,
  getQuoteDetailsQuery,
} from '../../../../reducers/queriesReducer';

const style = { width: '120px', borderBottom: 'none' };

const ServiceBody = () => {
  const dispatch = useDispatch();
  const quoteDetailsQuery = useSelector(getQuoteDetailsQuery);
  const quoteDetails = useSelector(getQuoteDetails);
  const { isFetching, result } = quoteDetailsQuery ?? {};
  const handleDeleteClick = useCallback(
    ({ quoteId, serviceTypeId }) => {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to remove?')) {
        dispatch(removeService({ quoteId, serviceTypeId }));
      }
      dispatch(fetchQuoteDetails({ quoteId }));
    },
    [dispatch]
  );
  if (isFetching || !result) {
    return null;
  }

  // getting lineItems and quoteID from quoteDetails after making sure we have data
  // if statement above
  const { lineItems, id: quoteId } = quoteDetails;

  return (
    <TableBody>
      {lineItems.map((service, index) => (
        <>
          <TableRow sx={{ px: 0 }}>
            <TableCell sx={{ borderBottom: 'none' }}> {index + 1}</TableCell>
            <TableCell
              sx={{ width: 300, borderBottom: 'none' }}
              component="th"
              scope="row"
            >
              {service.name}
            </TableCell>
            <TableCell sx={style} align="right">
              ${service.laborCost.toFixed(2)}
            </TableCell>
            <TableCell sx={style} align="right">
              {(service.timeInMinutes / 60).toFixed(2)}
            </TableCell>
            <TableCell sx={style} align="right">
              {0}%
            </TableCell>
            <TableCell sx={style} align="right">
              $
              {(
                (service.timeInMinutes / 60) *
                service.laborCost *
                (1 - 0)
              ).toFixed(2)}
            </TableCell>
            <TableCell sx={{ width: 8, borderBottom: 'none' }} align="right">
              <Tooltip title="Delete">
                <IconButton
                  onClick={() =>
                    handleDeleteClick({
                      quoteId,
                      serviceTypeId: service.serviceTypeId,
                    })
                  }
                >
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
                    {service.requiredParts.map(requiredPart => {
                      if (requiredPart.options.length > 0) {
                        const options = requiredPart.options.map(o => ({
                          value: o.id,
                          label: o.name,
                        }));

                        return (
                          <TableRow key={requiredPart.name}>
                            <TableCell
                              sx={{ width: 188, borderBottom: 'none' }}
                              component="th"
                              scope="row"
                            >
                              <Field
                                component={Dropdown}
                                name="id"
                                label=""
                                fullWidth
                                options={options}
                              />
                            </TableCell>
                            <TableCell sx={style} align="right">
                              {/* ${partOption.price.toFixed(2)} */}
                            </TableCell>
                            <TableCell sx={style} align="right">
                              {1}
                            </TableCell>
                            <TableCell sx={style} align="right">
                              {0}%
                            </TableCell>
                            <TableCell style={style} align="right">
                              {/* ${(partOption.price * 1 * (1 - 0)).toFixed(2)} */}
                            </TableCell>
                          </TableRow>
                        );
                      }
                      return null;
                    })}
                  </TableBody>
                </Table>
              </Box>
            </TableCell>
          </TableRow>
        </>
      ))}
    </TableBody>
  );
};

export default ServiceBody;

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';

import { Delete } from '@mui/icons-material';

const style = { width: '120px', borderBottom: 'none' };

const ServiceRow = props => {
  const { row, index } = props;
  const { service, selectedParts } = row;

  return (
    <React.Fragment>
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
          ${service.hourlyRate.toFixed(2)}
        </TableCell>
        <TableCell sx={style} align="right">
          {service.duration / 60}
        </TableCell>
        <TableCell sx={style} align="right">
          {service.discount * 100}%
        </TableCell>
        <TableCell sx={style} align="right">
          $
          {(
            (service.duration / 60) *
            service.hourlyRate *
            (1 - service.discount)
          ).toFixed(2)}
        </TableCell>
        <TableCell sx={{ width: 8, borderBottom: 'none' }} align="right">
          <Delete sx={{ color: 'red' }} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={7}>
          <Box sx={{ mr: 7, ml: 14, mb: 2 }}>
            <Table size="small">
              <TableBody>
                {selectedParts.map(p => (
                  <TableRow key={p.date}>
                    <TableCell
                      sx={{ width: 264, borderBottom: 'none' }}
                      component="th"
                      scope="row"
                    >
                      {p.name}
                    </TableCell>
                    <TableCell sx={style} align="right">
                      ${p.unitPrice.toFixed(2)}
                    </TableCell>
                    <TableCell sx={style} align="right">
                      {p.quantity}
                    </TableCell>
                    <TableCell sx={style} align="right">
                      {p.discount * 100}%
                    </TableCell>
                    <TableCell style={style} align="right">
                      $
                      {(p.unitPrice * p.quantity * (1 - p.discount)).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

ServiceRow.propTypes = {
  index: PropTypes.number.isRequired,
  row: PropTypes.shape({
    service: PropTypes.shape({
      name: PropTypes.string.isRequired,
      hourlyRate: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
    }).isRequired,
    selectedParts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        unitPrice: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
      })
    ).isRequired,
  }),
};

export default ServiceRow;

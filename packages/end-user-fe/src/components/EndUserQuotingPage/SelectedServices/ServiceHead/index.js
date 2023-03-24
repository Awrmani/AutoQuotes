import React from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton, TableCell, TableHead, TableRow } from '@mui/material';

const ServiceHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: 50 }}>#</TableCell>
        <TableCell sx={{ fontWeight: 700 }}>Services</TableCell>
        <TableCell sx={{ fontWeight: 700, width: 120 }} align="right">
          Hourly Rate/ Price
        </TableCell>
        <TableCell sx={{ fontWeight: 700, width: 120 }} align="right">
          Hours / Units
        </TableCell>
        <TableCell sx={{ fontWeight: 700, width: 120 }} align="right">
          Discount (%)
        </TableCell>
        <TableCell sx={{ fontWeight: 700, width: 120 }} align="right">
          Total Price ($)
        </TableCell>
        <TableCell sx={{ fontWeight: 700, width: 20 }} align="right">
          <IconButton data-testid="deleteButton">
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ServiceHead;

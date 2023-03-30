import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

const ServiceHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: 50 }}>#</TableCell>
        <TableCell sx={{ fontWeight: 700 }}>Services</TableCell>
        <TableCell sx={{ fontWeight: 700, width: 120 }} align="right">
          Hours of Labor
        </TableCell>
        <TableCell sx={{ fontWeight: 700, width: 120 }} align="right">
          Cost
        </TableCell>
        <TableCell
          sx={{ fontWeight: 700, width: 20 }}
          align="right"
        ></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ServiceHead;

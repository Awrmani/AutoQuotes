import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Delete } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import ServiceRow from './ServiceRow';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: 'Part 1',
        customerId: '123',
        amount: 3,
      },
      {
        date: 'Part 2',
        customerId: '12',
        amount: 1,
      },
    ],
  };
}

const rows = [
  createData('Tire rotation', 159, 6.0, 24, 4.0, 3.99),
  createData('Break pads replacement - Front axle', 237, 9.0, 37, 4.3, 4.99),
  createData('Break pads replacement - Rear axle', 262, 16.0, 24, 6.0, 3.79),
  createData('Suspension Alignment', 305, 3.7, 67, 4.3, 2.5),
  createData('Software redeploy', 356, 16.0, 49, 3.9, 1.5),
];

const SelectedServices = () => {
  return (
    <Container>
      <Typography component="h1" variant="h5">
        Selected Services
      </Typography>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 50 }} />
              <TableCell sx={{ fontWeight: 700 }}>Services</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }} align="right">
                Hourly Rate/ Price
              </TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }} align="right">
                Duration/ Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }} align="right">
                Discount (%)
              </TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }} align="right">
                Total Price ($)
              </TableCell>
              <TableCell sx={{ fontWeight: 700, width: 20 }} align="right">
                <Delete />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <ServiceRow key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default SelectedServices;

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

function createData(service, selectedPart) {
  return {
    service: {
      name: service.name,
      hourlyRate: service.hourlyRate,
      duration: service.duration,
      discount: service.discount,
    },
    selectedParts: [selectedPart, selectedPart, selectedPart],
  };
}
const service = {
  name: 'Break pads replacement - Rear axle',
  hourlyRate: 26.0,
  duration: 90,
  discount: 0.1,
};
const selectedPart = {
  name: 'Rear break pads',
  unitPrice: 100,
  quantity: 2,
  discount: 0.1,
};

const lineItems = [
  createData(service, selectedPart),
  createData(service, selectedPart),
  createData(service, selectedPart),
];

const SelectedServices = () => {
  return (
    <Container>
      <Typography component="h1" variant="h5">
        Selected Services
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 50 }}>#</TableCell>
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
            {lineItems.map((row, index) => (
              <ServiceRow key={row.service.name} row={row} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default SelectedServices;

import React from 'react';
import Table from '@mui/material/Table';

import TableContainer from '@mui/material/TableContainer';

import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import ServiceBody from './ServiceBody';
import ServiceHead from './ServiceHead';

const SelectedServices = () => {
  return (
    <Container>
      <Typography component="h1" variant="h5">
        Selected Services
      </Typography>
      <TableContainer>
        <Table>
          <ServiceHead />
          <ServiceBody />
        </Table>
      </TableContainer>
    </Container>
  );
};
export default SelectedServices;

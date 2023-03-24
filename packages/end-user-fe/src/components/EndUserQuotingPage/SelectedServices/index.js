import React from 'react';
import { Container, Table, Typography } from '@mui/material';
import ServiceBody from './ServiceBody';
import ServiceHead from './ServiceHead';

const SelectedServices = () => {
  return (
    <Container>
      <Typography component="h1" variant="h5">
        Selected Services
      </Typography>
      <Table>
        <ServiceHead />
        <ServiceBody />
      </Table>
    </Container>
  );
};
export default SelectedServices;

import React, { useContext } from 'react';
import { Container, Table, Typography, TableBody } from '@mui/material';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import ServiceRow from './ServiceRow';
import ServiceHead from './ServiceHead';

const SelectedServices = () => {
  const { values } = useContext(formContext);

  return (
    <Container>
      <Typography component="h1" variant="h5">
        Selected Services
      </Typography>
      <Table>
        <ServiceHead />
        <TableBody>
          {values.lineItems?.map((service, lineItemIndex) => (
            <ServiceRow key={service.id} lineItemIndex={lineItemIndex} />
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
export default SelectedServices;

import React, { useContext } from 'react';
import { Container, Table, Typography, TableBody } from '@mui/material';

import formContext from '@autoquotes/common/src/components/Form/formContext';
import ServiceRow from './ServiceRow';
import ServiceHead from './ServiceHead';
import Summary from './Summary';

const SelectedServices = () => {
  const { values } = useContext(formContext);

  return (
    <Container>
      <Typography component="h1" variant="h5">
        Selected Services
      </Typography>
      <Table size="small">
        <ServiceHead />
        <TableBody>
          {values.lineItems?.map((service, lineItemIndex) => (
            <ServiceRow key={service.id} lineItemIndex={lineItemIndex} />
          ))}
          <Summary />
        </TableBody>
      </Table>
    </Container>
  );
};
export default SelectedServices;

import React, { useContext } from 'react';
import { Container, Table, Typography, TableBody } from '@mui/material';
import PropTypes from 'prop-types';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import ServiceRow from './ServiceRow';
import ServiceHead from './ServiceHead';
import Summary from './Summary';

const SelectedServices = ({ isFinalized }) => {
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
            <ServiceRow
              isFinalized={isFinalized}
              key={service.id}
              lineItemIndex={lineItemIndex}
            />
          ))}
          <Summary />
        </TableBody>
      </Table>
    </Container>
  );
};
SelectedServices.propTypes = {
  isFinalized: PropTypes.bool,
};
SelectedServices.defaultProps = {
  isFinalized: false,
};
export default SelectedServices;

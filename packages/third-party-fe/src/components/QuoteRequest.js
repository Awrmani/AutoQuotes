import React, { useContext } from 'react';
import { Box, Container, Paper, Tab, Tabs } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { getRequestedParts } from '../reducers/queriesReducer';
import PartForm from './PartForm';

const QuoteRequest = () => {
  const requestedParts = useSelector(getRequestedParts);

  const { initialValues, values } = useContext(formContext);
  const [tab, setTab] = React.useState(0);

  // set partRequestId to the first requested part.
  initialValues.partRequestId = requestedParts[tab]?.id;

  const handleChange = (event, tabIndex) => {
    // clear out the form when moving between tabs
    Object.keys(values).forEach(a => {
      if (a !== 'quoteId' && a !== 'supplierId') {
        values[a] = '';
      }
    });
    // set partRequestId according to tab indexes.
    values.partRequestId = requestedParts[tabIndex].id;
    // reset date for the form
    values.offerExpiration = moment();
    setTab(tabIndex);
  };

  return (
    <Container component={Paper}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange}>
          {requestedParts.map(({ partName }) => (
            <Tab label={partName} key={partName} />
          ))}
        </Tabs>
      </Box>
      <PartForm />
    </Container>
  );
};
export default QuoteRequest;

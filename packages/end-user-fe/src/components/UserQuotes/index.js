import React from 'react';
import { Container, Paper, Table, TableBody } from '@mui/material';
import { useSelector } from 'react-redux';
import { getQuoteList } from '../../reducers/queriesReducer';
import ServiceHead from '../EndUserQuotingPage/SelectedServices/ServiceHead';

const UserQuotes = () => {
  const quoteList = useSelector(getQuoteList);
  const { lineItems } = quoteList;
  console.log(lineItems);
  return (
    <Container component={Paper}>
      <Table size="small">
        <ServiceHead />
        <TableBody>{/* <Summary /> */}</TableBody>
      </Table>
    </Container>
  );
};

export default UserQuotes;

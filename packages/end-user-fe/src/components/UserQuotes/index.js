import React from 'react';
import { Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { getQuoteList } from '../../reducers/queriesReducer';

const UserQuotes = () => {
  const quoteList = useSelector(getQuoteList);
  console.log(quoteList);
  return <Container component={Paper}>hello</Container>;
};

export default UserQuotes;

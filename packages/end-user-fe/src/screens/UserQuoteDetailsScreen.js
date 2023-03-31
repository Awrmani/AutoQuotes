import React, { useMemo } from 'react';
import { Form } from '@autoquotes/common/src/components/Form';

import { useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import EndUserQuotingPage from '../components/EndUserQuotingPage';
import { finalizeQuote } from '../actions';

import { getQuoteDetailsQuery } from '../reducers/queriesReducer';

const UserQuoteDetailsScreen = () => {
  const quoteDetailsQuery = useSelector(getQuoteDetailsQuery);
  const { isFetching, result } = quoteDetailsQuery;

  const initialValues = useMemo(
    () => ({
      quoteId: result?.id ?? '',
      lineItems: result?.lineItems,
    }),
    [result]
  );

  // DO not render while data is fetching from the BE
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );
  return (
    <Form
      enableReinitialize
      initialValues={initialValues}
      action={finalizeQuote}
      onSuccess={null}
    >
      <EndUserQuotingPage isFinalized />
    </Form>
  );
};

export default UserQuoteDetailsScreen;

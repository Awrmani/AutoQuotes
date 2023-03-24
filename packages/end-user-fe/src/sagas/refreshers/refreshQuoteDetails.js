import { put, take } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';

import { fetchQuoteDetails } from '../../actions';

const refreshQuoteDetails = function* (response, meta) {
  const quoteId = meta?.params?.quoteId ?? response?.id;

  yield take(waitFor(yield put(fetchQuoteDetails({ quoteId }))));
};

export default refreshQuoteDetails;

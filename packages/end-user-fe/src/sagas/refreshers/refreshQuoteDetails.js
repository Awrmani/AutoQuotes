import { put, take } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';

import { fetchQuoteDetails } from '../../actions';

const refreshQuoteDetails = function* () {
  yield take(waitFor(yield put(fetchQuoteDetails())));
};

export default refreshQuoteDetails;

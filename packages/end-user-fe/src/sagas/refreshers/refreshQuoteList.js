import { put, take } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';

import { fetchQuoteList } from '../../actions';

const refreshQuoteList = function* () {
  yield take(waitFor(yield put(fetchQuoteList())));
};

export default refreshQuoteList;

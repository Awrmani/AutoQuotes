import { put, take } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';

import { fetchServiceList } from '../../actions';

const refreshServiceList = function* () {
  yield take(waitFor(yield put(fetchServiceList())));
};

export default refreshServiceList;

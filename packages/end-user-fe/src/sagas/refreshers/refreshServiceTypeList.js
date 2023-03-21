import { put, take } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';

import { fetchServiceTypeList } from '../../actions';

const refreshServiceTypeList = function* () {
  yield take(waitFor(yield put(fetchServiceTypeList())));
};

export default refreshServiceTypeList;

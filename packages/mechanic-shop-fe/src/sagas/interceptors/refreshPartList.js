import { put, take } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';

import { fetchPartList } from '../../actions';

const refreshPartList = function* () {
  yield take(waitFor(yield put(fetchPartList())));
};

export default refreshPartList;

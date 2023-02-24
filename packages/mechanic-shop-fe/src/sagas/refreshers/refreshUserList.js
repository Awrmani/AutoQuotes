import { put, take } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';

import { fetchUserList } from '../../actions';

const refreshUserList = function* () {
  yield take(waitFor(yield put(fetchUserList())));
};

export default refreshUserList;

import { put, take, select } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';
import { getToken } from '@autoquotes/libraries/src/reducers/tokenReducer';
import { fetchPartList } from '../../actions';

const refreshPartList = function* () {
  const token = yield select(getToken);

  if (token) {
    yield take(waitFor(yield put(fetchPartList())));
  }
};

export default refreshPartList;

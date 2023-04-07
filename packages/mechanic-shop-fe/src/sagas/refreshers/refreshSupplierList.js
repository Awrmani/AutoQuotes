import { put, take, select } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';
import { getToken } from '@autoquotes/libraries/src/reducers/tokenReducer';
import { fetchSupplierList } from '../../actions';

const refreshSupplierList = function* () {
  const token = yield select(getToken);

  if (token) {
    yield take(waitFor(yield put(fetchSupplierList())));
  }
};

export default refreshSupplierList;

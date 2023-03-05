import { put, take, select } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';
import { getToken } from '@autoquotes/libraries/src/reducers/tokenReducer';
import { fetchVehicleTypeList } from '../../actions';

const refreshVehicleTypeList = function* () {
  const token = yield select(getToken);

  if (token) {
    yield take(waitFor(yield put(fetchVehicleTypeList())));
  }
};

export default refreshVehicleTypeList;

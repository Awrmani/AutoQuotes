import { put, take } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';

import { fetchVehicleTypeList } from '../../actions';

const refreshVehicleTypeList = function* () {
  yield take(waitFor(yield put(fetchVehicleTypeList())));
};

export default refreshVehicleTypeList;

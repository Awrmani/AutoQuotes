import { put, take } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';

import { fetchAppointmentList } from '../../actions';

const refreshAppointmentList = function* () {
  yield take(waitFor(yield put(fetchAppointmentList())));
};

export default refreshAppointmentList;

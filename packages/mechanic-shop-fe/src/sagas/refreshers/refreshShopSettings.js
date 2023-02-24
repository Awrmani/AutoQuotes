import { put, take } from 'redux-saga/effects';
import { waitFor } from '@autoquotes/libraries/src/saga/sagaFactoryHelpers';

import { fetchShopSettings } from '../../actions';

const refreshShopSettings = function* () {
  yield take(waitFor(yield put(fetchShopSettings())));
};

export default refreshShopSettings;

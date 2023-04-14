import { all, takeLatest } from 'redux-saga/effects';
import { BOOTSTRAPPED } from '@autoquotes/libraries/src/constants/actionTypes';
import successToast from '@autoquotes/libraries/src/saga/successToast';
import { apiCallSagaFactory } from '@autoquotes/libraries/src/saga/apiCallSagaFactory';
import { errorTranslationInterceptor } from '@autoquotes/libraries/src/saga/interceptors/errorTranslation';
import * as actionTypes from '../constants/actionTypes';
import * as thirdPartyApi from '../resources/thirdPartyApi';

const apiCall = apiCallSagaFactory({
  // These are interceptors that are added globally -- All apiCall sagas execute it
  requestInterceptors: [],
  responseInterceptors: [
    // normalizeResponseInterceptor,
  ],
  errorInterceptors: [errorTranslationInterceptor],
});

// This runs every time the application is starting up
const initApp = function* () {
  // yield call(refreshRequestedParts);
};

export default function* root() {
  yield all([
    // Internal
    takeLatest(BOOTSTRAPPED, initApp),
    // Quotes
    takeLatest(actionTypes.REQUESTED_PARTS_FETCH, apiCall, {
      apiFn: thirdPartyApi.fetchRequestedParts,
      onSuccess: [apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.PARTS_OFFER, apiCall, {
      apiFn: thirdPartyApi.offerParts,
      onSuccess: [[successToast('Offer sent!')], apiCall.DISPATCH_SUCCESS],
    }),
  ]);
}

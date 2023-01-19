import { all, takeLatest } from 'redux-saga/effects';
import { BOOTSTRAPPED } from '@autoquotes/libraries/src/constants/actionTypes';
import { apiCallSagaFactory } from '@autoquotes/libraries/src/saga/apiCallSagaFactory';
import * as actionTypes from '../constants/actionTypes';
import * as mechanicShopApi from '../resources/mechanicShopApi';

const apiCall = apiCallSagaFactory({
  requestInterceptors: [
    // addTokenRequestInterceptor,
  ],
  responseInterceptors: [
    // General interceptorsacce
    // normalizeResponseInterceptor,
  ],
  errorInterceptors: [
    // errorTranslationInterceptor
  ],
});

const initApp = () => {
  // Just a placeholder for now
};

export default function* root() {
  yield all([
    // Internal
    takeLatest(BOOTSTRAPPED, initApp),
    takeLatest(actionTypes.LOGIN, apiCall, {
      apiFn: mechanicShopApi.login,
      noInjectToken: true,
      onSuccess: [
        [
          // earlySetToken
        ],
        [
          // refreshCurrentUser
        ],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
  ]);
}

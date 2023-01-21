import { all, takeLatest } from 'redux-saga/effects';
import { BOOTSTRAPPED } from '@autoquotes/libraries/src/constants/actionTypes';
import { apiCallSagaFactory } from '@autoquotes/libraries/src/saga/apiCallSagaFactory';
import {
  earlySetToken,
  addTokenRequestInterceptor,
} from '@autoquotes/libraries/src/saga/interceptors/token';
import { errorTranslationInterceptor } from '@autoquotes/libraries/src/saga/interceptors/errorTranslation';
import * as actionTypes from '../constants/actionTypes';
import * as endUserApi from '../resources/endUserApi';

const apiCall = apiCallSagaFactory({
  // These are interceptors that are added globally -- All apiCall sagas execute it
  requestInterceptors: [addTokenRequestInterceptor],
  responseInterceptors: [
    // normalizeResponseInterceptor,
  ],
  errorInterceptors: [errorTranslationInterceptor],
});

const initApp = () => {
  // Just a placeholder for now
};

export default function* root() {
  yield all([
    // Internal
    takeLatest(BOOTSTRAPPED, initApp),
    takeLatest(actionTypes.LOGIN, apiCall, {
      apiFn: endUserApi.login,
      noInjectToken: true,
      onSuccess: [
        [earlySetToken],
        [
          // refreshCurrentUser
        ],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
  ]);
}

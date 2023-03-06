import { all, takeLatest, call } from 'redux-saga/effects';
import { BOOTSTRAPPED } from '@autoquotes/libraries/src/constants/actionTypes';
import { apiCallSagaFactory } from '@autoquotes/libraries/src/saga/apiCallSagaFactory';
import {
  earlySetToken,
  addTokenRequestInterceptor,
} from '@autoquotes/libraries/src/saga/interceptors/token';
import successToast from '@autoquotes/libraries/src/saga/successToast';
import { errorTranslationInterceptor } from '@autoquotes/libraries/src/saga/interceptors/errorTranslation';
import logoutErrorInterceptor from '@autoquotes/libraries/src/saga/interceptors/logoutErrorInterceptor';
import * as actionTypes from '../constants/actionTypes';
import * as endUserApi from '../resources/endUserApi';
import refreshCurrentUser from './refreshers/refreshCurrentUser';

const apiCall = apiCallSagaFactory({
  // These are interceptors that are added globally -- All apiCall sagas execute it
  requestInterceptors: [addTokenRequestInterceptor],
  responseInterceptors: [
    // normalizeResponseInterceptor,
  ],
  errorInterceptors: [logoutErrorInterceptor, errorTranslationInterceptor],
});

// This runs every time the application is starting up
const initApp = function* () {
  yield call(refreshCurrentUser);
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
        [refreshCurrentUser],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
    takeLatest(actionTypes.CURRENT_USER_FETCH, apiCall, {
      apiFn: endUserApi.fetchCurrentUser,
    }),
    // Shop settings
    takeLatest(actionTypes.SHOP_SETTINGS_FETCH, apiCall, {
      apiFn: endUserApi.fetchShopSettings,
    }),
    // User
    takeLatest(actionTypes.USER_DETAILS_FETCH, apiCall, {
      apiFn: endUserApi.fetchUserDetails,
    }),
    takeLatest(actionTypes.USER_REGISTER, apiCall, {
      apiFn: endUserApi.registerUser,
      onSuccess: [[successToast('User added!')], apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.USER_UPDATE, apiCall, {
      apiFn: endUserApi.updateUser,
      onSuccess: [[successToast('User updated!')], apiCall.DISPATCH_SUCCESS],
    }),
  ]);
}

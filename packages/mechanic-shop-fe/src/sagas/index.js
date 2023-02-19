import { all, takeLatest, call } from 'redux-saga/effects';
import { BOOTSTRAPPED } from '@autoquotes/libraries/src/constants/actionTypes';
import { apiCallSagaFactory } from '@autoquotes/libraries/src/saga/apiCallSagaFactory';
import {
  earlySetToken,
  addTokenRequestInterceptor,
} from '@autoquotes/libraries/src/saga/interceptors/token';
import { errorTranslationInterceptor } from '@autoquotes/libraries/src/saga/interceptors/errorTranslation';
import logoutErrorInterceptor from '@autoquotes/libraries/src/saga/interceptors/logoutErrorInterceptor';
import * as actionTypes from '../constants/actionTypes';
import * as mechanicShopApi from '../resources/mechanicShopApi';
import refreshCurrentUser from './interceptors/refreshCurrentUser';
import refreshPartList from './interceptors/refreshPartList';
import refreshUserList from './interceptors/refreshUserList';

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
      apiFn: mechanicShopApi.login,
      noInjectToken: true,
      onSuccess: [
        [earlySetToken],
        [refreshCurrentUser],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
    takeLatest(actionTypes.CURRENT_USER_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchCurrentUser,
    }),

    // Part
    takeLatest(actionTypes.PART_LIST_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchPartList,
    }),
    takeLatest(actionTypes.PART_DETAILS_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchPartDetails,
    }),
    takeLatest(actionTypes.PART_ADD, apiCall, {
      apiFn: mechanicShopApi.addPart,
      onSuccess: [[refreshPartList], apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.PART_UPDATE, apiCall, {
      apiFn: mechanicShopApi.updatePart,
      onSuccess: [[refreshPartList], apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.PART_DELETE, apiCall, {
      apiFn: mechanicShopApi.deletePart,
      onSuccess: [[refreshPartList], apiCall.DISPATCH_SUCCESS],
    }),

    // User
    takeLatest(actionTypes.USER_LIST_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchUserList,
    }),
    takeLatest(actionTypes.USER_DETAILS_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchUserDetails,
    }),
    takeLatest(actionTypes.USER_ADD, apiCall, {
      apiFn: mechanicShopApi.addUser,
      onSuccess: [[refreshUserList], apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.USER_UPDATE, apiCall, {
      apiFn: mechanicShopApi.updateUser,
      onSuccess: [[refreshUserList], apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.USER_DELETE, apiCall, {
      apiFn: mechanicShopApi.deleteUser,
      onSuccess: [[refreshUserList], apiCall.DISPATCH_SUCCESS],
    }),
  ]);
}

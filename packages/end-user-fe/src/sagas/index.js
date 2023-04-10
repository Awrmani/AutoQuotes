import { all, takeLatest, takeLeading, call } from 'redux-saga/effects';
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
import refreshVehicleTypeList from './refreshers/refreshVehicleTypeList';
import refreshQuoteDetails from './refreshers/refreshQuoteDetails';

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
  yield call(refreshVehicleTypeList);
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
    takeLatest(actionTypes.VEHICLE_TYPE_LIST_FETCH, apiCall, {
      apiFn: endUserApi.fetchVehicleTypeList,
    }),
    // Shop settings
    takeLatest(actionTypes.SHOP_SETTINGS_FETCH, apiCall, {
      apiFn: endUserApi.fetchShopSettings,
    }),
    takeLatest(actionTypes.USER_REGISTER, apiCall, {
      apiFn: endUserApi.registerUser,
      onSuccess: [apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.USER_UPDATE, apiCall, {
      apiFn: endUserApi.updateUser,
      onSuccess: [
        [refreshCurrentUser],
        [successToast('Successfully updated!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
    takeLeading(actionTypes.USER_CONFIRM, apiCall, {
      apiFn: endUserApi.confirmUser,
      onSuccess: [
        [earlySetToken],
        [refreshCurrentUser],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),

    // Quotes
    takeLatest(actionTypes.QUOTE_CREATE, apiCall, {
      apiFn: endUserApi.createQuote,
      onSuccess: [[refreshQuoteDetails], apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.QUOTE_DETAILS_FETCH, apiCall, {
      apiFn: endUserApi.fetchQuoteDetails,
      onSuccess: [apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.QUOTE_UPDATE, apiCall, {
      apiFn: endUserApi.updateQuote,
      onSuccess: [apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.QUOTE_FINALIZE, apiCall, {
      apiFn: endUserApi.finalizeQuote,
      onSuccess: [[refreshQuoteDetails], apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.QUOTE_LIST_FETCH, apiCall, {
      apiFn: endUserApi.fetchQuoteList,
      onSuccess: [apiCall.DISPATCH_SUCCESS],
    }),

    // Services
    takeLatest(actionTypes.SERVICE_TYPE_LIST_FETCH, apiCall, {
      apiFn: endUserApi.fetchServiceTypeList,
      onSuccess: [apiCall.DISPATCH_SUCCESS],
    }),

    takeLatest(actionTypes.SERVICE_ADD, apiCall, {
      apiFn: endUserApi.addService,
      onSuccess: [[refreshQuoteDetails], apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.SERVICE_REMOVE, apiCall, {
      apiFn: endUserApi.removeService,
      onSuccess: [[refreshQuoteDetails], apiCall.DISPATCH_SUCCESS],
    }),

    // Offers
    takeLatest(actionTypes.OFFERS_REQUEST, apiCall, {
      apiFn: endUserApi.requestOffers,
      onSuccess: [[refreshQuoteDetails], apiCall.DISPATCH_SUCCESS],
    }),
    // appointment
    takeLatest(actionTypes.APPOINTMENT_OPTIONS_FETCH, apiCall, {
      apiFn: endUserApi.fetchAppointmentOptions,
      onSuccess: [apiCall.DISPATCH_SUCCESS],
    }),
    takeLatest(actionTypes.APPOINTMENT_CREATE, apiCall, {
      apiFn: endUserApi.addAppointment,
      onSuccess: [
        [successToast('Appointment created!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
  ]);
}

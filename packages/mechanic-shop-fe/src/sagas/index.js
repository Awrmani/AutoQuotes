import { all, takeLatest, call } from 'redux-saga/effects';
import { BOOTSTRAPPED } from '@autoquotes/libraries/src/constants/actionTypes';
import { apiCallSagaFactory } from '@autoquotes/libraries/src/saga/apiCallSagaFactory';
import {
  earlySetToken,
  addTokenRequestInterceptor,
} from '@autoquotes/libraries/src/saga/interceptors/token';
import { errorTranslationInterceptor } from '@autoquotes/libraries/src/saga/interceptors/errorTranslation';
import logoutErrorInterceptor from '@autoquotes/libraries/src/saga/interceptors/logoutErrorInterceptor';
import successToast from '@autoquotes/libraries/src/saga/successToast';
import * as actionTypes from '../constants/actionTypes';
import * as mechanicShopApi from '../resources/mechanicShopApi';
import refreshCurrentUser from './refreshers/refreshCurrentUser';
import refreshPartList from './refreshers/refreshPartList';
import refreshUserList from './refreshers/refreshUserList';
import refreshServiceList from './refreshers/refreshServiceList';
import refreshShopSettings from './refreshers/refreshShopSettings';
import refreshAppointmentList from './refreshers/refreshAppointment';
import refreshVehicleTypeList from './refreshers/refreshVehicleTypeList';

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

  // Pre loading this for autocomplete suggestions
  yield call(refreshVehicleTypeList);
  yield call(refreshPartList);
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
        [refreshCurrentUser, refreshVehicleTypeList, refreshPartList],
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
      onSuccess: [
        [refreshPartList],
        [successToast('Part added!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
    takeLatest(actionTypes.PART_UPDATE, apiCall, {
      apiFn: mechanicShopApi.updatePart,
      onSuccess: [
        [refreshPartList],
        [successToast('Part updated!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
    takeLatest(actionTypes.PART_DELETE, apiCall, {
      apiFn: mechanicShopApi.deletePart,
      onSuccess: [
        [refreshPartList],
        [successToast('Part deleted!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),

    // Vehicle Type
    takeLatest(actionTypes.VEHICLE_TYPE_LIST_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchVehicleTypes,
    }),
    takeLatest(actionTypes.VEHICLE_TYPE_DETAILS_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchvehicleTypeDetails,
    }),
    takeLatest(actionTypes.VEHICLE_TYPE_ADD, apiCall, {
      apiFn: mechanicShopApi.addVehicleType,
      onSuccess: [
        [refreshVehicleTypeList],
        [successToast('Vehicle type added!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
    takeLatest(actionTypes.VEHICLE_TYPE_UPDATE, apiCall, {
      apiFn: mechanicShopApi.updateVehicleType,
      onSuccess: [
        [refreshVehicleTypeList],
        [successToast('Vehicle type updated!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
    takeLatest(actionTypes.VEHICLE_TYPE_DELETE, apiCall, {
      apiFn: mechanicShopApi.deleteVehicleType,
      onSuccess: [
        [refreshVehicleTypeList],
        [successToast('Vehicle type deleted!')],
        apiCall.DISPATCH_SUCCESS,
      ],
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
      onSuccess: [
        [refreshUserList],
        [successToast('User added!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
    takeLatest(actionTypes.USER_UPDATE, apiCall, {
      apiFn: mechanicShopApi.updateUser,
      onSuccess: [
        [refreshUserList, refreshCurrentUser],
        [successToast('User updated!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
    takeLatest(actionTypes.USER_DELETE, apiCall, {
      apiFn: mechanicShopApi.deleteUser,
      onSuccess: [
        [refreshUserList],
        [successToast('User deleted!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),

    // Service
    takeLatest(actionTypes.SERVICE_LIST_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchServiceList,
    }),
    takeLatest(actionTypes.SERVICE_DETAILS_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchServiceDetails,
    }),
    takeLatest(actionTypes.SERVICE_ADD, apiCall, {
      apiFn: mechanicShopApi.addService,
      onSuccess: [
        [refreshServiceList],
        [successToast('Service type added!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
    takeLatest(actionTypes.SERVICE_UPDATE, apiCall, {
      apiFn: mechanicShopApi.updateService,
      onSuccess: [
        [refreshServiceList],
        [successToast('Service type updated!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),
    takeLatest(actionTypes.SERVICE_DELETE, apiCall, {
      apiFn: mechanicShopApi.deleteService,
      onSuccess: [
        [refreshServiceList],
        [successToast('Service type deleted!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),

    // Shop settings
    takeLatest(actionTypes.SHOP_SETTINGS_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchShopSettings,
    }),
    takeLatest(actionTypes.SHOP_SETTINGS_UPDATE, apiCall, {
      apiFn: mechanicShopApi.updateShopSettings,
      onSuccess: [
        [refreshShopSettings],
        [successToast('Shop settings updated!')],
        apiCall.DISPATCH_SUCCESS,
      ],
    }),

    // Appointment
    takeLatest(actionTypes.APPOINTMENT_LIST_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchAppointmentList,
    }),
    takeLatest(actionTypes.APPOINTMENT_DETAILS_FETCH, apiCall, {
      apiFn: mechanicShopApi.fetchAppointmentDetails,
    }),
    takeLatest(actionTypes.APPOINTMENT_DELETE, apiCall, {
      apiFn: mechanicShopApi.deleteAppointment,
      onSuccess: [[refreshAppointmentList], apiCall.DISPATCH_SUCCESS],
    }),
  ]);
}

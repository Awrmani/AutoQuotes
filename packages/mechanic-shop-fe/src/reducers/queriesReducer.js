import { combineReducers } from 'redux';
import queryReducer from '@autoquotes/libraries/src/reducers/queryReducer';
import * as actionTypes from '../constants/actionTypes';

export default combineReducers({
  currentUser: queryReducer({
    triggerActionType: actionTypes.CURRENT_USER_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  // Parts
  partList: queryReducer({
    triggerActionType: actionTypes.PART_LIST_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  partDetails: queryReducer({
    triggerActionType: actionTypes.PART_DETAILS_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  // Users
  userList: queryReducer({
    triggerActionType: actionTypes.USER_LIST_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  userDetails: queryReducer({
    triggerActionType: actionTypes.USER_DETAILS_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  // Services
  serviceList: queryReducer({
    triggerActionType: actionTypes.SERVICE_LIST_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  serviceDetails: queryReducer({
    triggerActionType: actionTypes.SERVICE_DETAILS_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  shopSettings: queryReducer({
    triggerActionType: actionTypes.SHOP_SETTINGS_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),

  // Appointment
  appointmentList: queryReducer({
    triggerActionType: actionTypes.APPOINTMENT_LIST_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  appointmentDetails: queryReducer({
    triggerActionType: actionTypes.APPOINTMENT_DETAILS_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),

  // Vehicle type
  vehicleTypeList: queryReducer({
    triggerActionType: actionTypes.VEHICLE_TYPE_LIST_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  vehicleTypeDetails: queryReducer({
    triggerActionType: actionTypes.VEHICLE_TYPE_DETAILS_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
});

/**
 * ##################### SELECTORS #####################
 */

export const getCurrentUserQuery = state => state.queries.currentUser;
export const getCurrentUser = state => state.queries.currentUser?.result;
// Parts
export const getPartListQuery = state => state.queries.partList;
export const getPartList = state => state.queries.partList?.result;

export const getPartDetailsQuery = state => state.queries.partDetails;
export const getPartDetails = state => state.queries.partDetails?.result;
// Users
export const getUserListQuery = state => state.queries.userList;
export const getUserList = state => state.queries.userList?.result;

export const getUserDetailsQuery = state => state.queries.userDetails;
export const getUserDetails = state => state.queries.userDetails?.result;

// Services
export const getServiceListQuery = state => state.queries.serviceList;
export const getServiceList = state => state.queries.serviceList?.result;

export const getServiceDetailsQuery = state => state.queries.serviceDetails;
export const getServiceDetails = state => state.queries.serviceDetails?.result;

// Shop settings
export const getShopSettingsQuery = state => state.queries.shopSettings;
export const getShopSettings = state => state.queries.shopSettings?.result;

// Appointment
export const getAppointmentListQuery = state => state.queries.appointmentList;
export const getAppointmentList = state =>
  state.queries.appointmentList?.result;

export const getAppointmentDetailsQuery = state =>
  state.queries.appointmentDetails;
export const getAppointmentDetails = state =>
  state.queries.appointmentDetails?.result;

// Vehicle Types
export const getVehicleTypeListQuery = state => state.queries.vehicleTypeList;
export const getVehicleTypeList = state =>
  state.queries.vehicleTypeList?.result;

export const getVehicleTypeDetailsQuery = state =>
  state.queries.vehicleTypeDetails;
export const getVehicleTypeDetails = state =>
  state.queries.vehicleTypeDetails?.result;

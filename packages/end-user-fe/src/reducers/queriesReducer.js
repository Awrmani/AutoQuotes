import { combineReducers } from 'redux';
import queryReducer from '@autoquotes/libraries/src/reducers/queryReducer';
import * as actionTypes from '../constants/actionTypes';

export default combineReducers({
  currentUser: queryReducer({
    triggerActionType: actionTypes.CURRENT_USER_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),

  shopSettings: queryReducer({
    triggerActionType: actionTypes.SHOP_SETTINGS_FETCH,
  }),

  vehicleTypeList: queryReducer({
    triggerActionType: actionTypes.VEHICLE_TYPE_LIST_FETCH,
  }),
  serviceTypeList: queryReducer({
    triggerActionType: actionTypes.SERVICE_TYPE_LIST_FETCH,
    purgeActionTypes: [actionTypes.QUOTE_CREATE],
  }),
});

/**
 * ##################### SELECTORS #####################
 */

export const getCurrentUserQuery = state => state.queries.currentUser;
export const getCurrentUser = state => state.queries.currentUser?.result;

// Shop settings
export const getShopSettingsQuery = state => state.queries.shopSettings;
export const getShopSettings = state => state.queries.shopSettings?.result;

// Vehicle type list
export const getVehicleTypeListQuery = state => state.queries.vehicleTypeList;
export const getVehicleTypeList = state =>
  state.queries.vehicleTypeList?.result;

// Service type list
export const getServiceTypeListQuery = state => state.queries.serviceTypeList;
export const getServiceTypeList = state =>
  state.queries.serviceTypeList?.result;

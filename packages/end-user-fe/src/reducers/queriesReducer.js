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
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  // Users
  userDetails: queryReducer({
    triggerActionType: actionTypes.USER_DETAILS_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
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

// Users
export const getUserDetailsQuery = state => state.queries.userDetails;
export const getUserDetails = state => state.queries.userDetails?.result;

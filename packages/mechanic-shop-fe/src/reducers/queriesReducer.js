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
  // Services
  serviceList: queryReducer({
    triggerActionType: actionTypes.SERVICE_LIST_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  serviceDetails: queryReducer({
    triggerActionType: actionTypes.SERVICE_DETAILS_FETCH,
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
// Services
export const getServiceListQuery = state => state.queries.serviceList;
export const getServiceList = state => state.queries.serviceList?.result;

export const getServiceDetailsQuery = state => state.queries.serviceDetails;
export const getServiceDetails = state => state.queries.serviceDetails?.result;

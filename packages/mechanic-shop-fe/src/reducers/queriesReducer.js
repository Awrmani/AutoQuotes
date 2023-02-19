import { combineReducers } from 'redux';
import queryReducer from '@autoquotes/libraries/src/reducers/queryReducer';
import * as actionTypes from '../constants/actionTypes';

export default combineReducers({
  currentUser: queryReducer({
    triggerActionType: actionTypes.CURRENT_USER_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  partList: queryReducer({
    triggerActionType: actionTypes.PART_LIST_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
  partDetails: queryReducer({
    triggerActionType: actionTypes.PART_DETAILS_FETCH,
    purgeActionTypes: [actionTypes.TOKEN_REMOVE],
  }),
});

/**
 * ##################### SELECTORS #####################
 */

export const getCurrentUserQuery = state => state.queries.currentUser;
export const getCurrentUser = state => state.queries.currentUser?.result;

export const getPartListQuery = state => state.queries.partList;
export const getPartList = state => state.queries.partList?.result;

export const getPartDetailsQuery = state => state.queries.partDetails;
export const getPartDetails = state => state.queries.partDetails?.result;

export const getUserListQuery = state => state.queries.userList;
export const getUserList = state => state.queries.userList?.result;

import { combineReducers } from 'redux';
import queryReducer from '@autoquotes/libraries/src/reducers/queryReducer';
import * as actionTypes from '../constants/actionTypes';

export default combineReducers({
  requestedParts: queryReducer({
    triggerActionType: actionTypes.REQUESTED_PARTS_FETCH,
  }),
});

/**
 * ##################### SELECTORS #####################
 */

export const getRequestedPartsQuery = state => state.queries.requestedParts;
export const getRequestedParts = state => state.queries.requestedParts?.result;

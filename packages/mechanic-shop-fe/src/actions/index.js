import createAction from '@autoquotes/libraries/src/utils/createAction';
import * as actionTypes from '../constants/actionTypes';

// Async data fetches

export const fetchCurrentUser = createAction(actionTypes.CURRENT_USER_FETCH);
export const fetchPartList = createAction(actionTypes.PART_LIST_FETCH);
export const fetchPartDetails = createAction(actionTypes.PART_DETAILS_FETCH);

// Form submits & other actions altering backend state
export const login = createAction(actionTypes.LOGIN);
export const addPart = createAction(actionTypes.PART_ADD);
export const updatePart = createAction(actionTypes.PART_UPDATE);
export const deletePart = createAction(actionTypes.PART_DELETE);

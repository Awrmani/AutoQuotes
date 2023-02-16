import createAction from '@autoquotes/libraries/src/utils/createAction';
import * as actionTypes from '../constants/actionTypes';

// Async data fetches

export const fetchCurrentUser = createAction(actionTypes.CURRENT_USER_FETCH);

// Form submits & other actions altering backend state
export const login = createAction(actionTypes.LOGIN);

export const addPart = createAction(actionTypes.PART_ADD);

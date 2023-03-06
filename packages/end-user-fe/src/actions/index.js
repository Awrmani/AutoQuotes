import createAction from '@autoquotes/libraries/src/utils/createAction';
import * as actionTypes from '../constants/actionTypes';

// Async data fetches
export const fetchShopSettings = createAction(actionTypes.SHOP_SETTINGS_FETCH);
export const fetchCurrentUser = createAction(actionTypes.CURRENT_USER_FETCH);

export const fetchUserDetails = createAction(actionTypes.USER_DETAILS_FETCH);

// Form submits & other actions altering backend state
export const login = createAction(actionTypes.LOGIN);

export const registerUser = createAction(actionTypes.USER_REGISTER);
export const updateUser = createAction(actionTypes.USER_UPDATE);

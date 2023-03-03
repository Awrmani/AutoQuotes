import createAction from '@autoquotes/libraries/src/utils/createAction';
import * as actionTypes from '../constants/actionTypes';

// Async data fetches
export const fetchShopSettings = createAction(actionTypes.SHOP_SETTINGS_FETCH);
export const fetchCurrentUser = createAction(actionTypes.CURRENT_USER_FETCH);
// TODO

// Form submits & other actions altering backend state
export const login = createAction(actionTypes.LOGIN);

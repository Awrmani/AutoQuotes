import createAction from '@autoquotes/libraries/src/utils/createAction';
import * as actionTypes from '../constants/actionTypes';

// Async data fetches

export const fetchShopSettings = createAction(actionTypes.SHOP_SETTINGS_FETCH);
export const fetchCurrentUser = createAction(actionTypes.CURRENT_USER_FETCH);
export const fetchPartList = createAction(actionTypes.PART_LIST_FETCH);
export const fetchPartDetails = createAction(actionTypes.PART_DETAILS_FETCH);

export const fetchServiceList = createAction(actionTypes.SERVICE_LIST_FETCH);
export const fetchServiceDetails = createAction(
  actionTypes.SERVICE_DETAILS_FETCH
);

export const fetchUserList = createAction(actionTypes.USER_LIST_FETCH);
export const fetchUserDetails = createAction(actionTypes.USER_DETAILS_FETCH);

// Form submits & other actions altering backend state
export const login = createAction(actionTypes.LOGIN);
export const updateShopSettings = createAction(
  actionTypes.SHOP_SETTINGS_UPDATE
);
export const addPart = createAction(actionTypes.PART_ADD);
export const updatePart = createAction(actionTypes.PART_UPDATE);
export const deletePart = createAction(actionTypes.PART_DELETE);

export const addService = createAction(actionTypes.SERVICE_ADD);
export const updateService = createAction(actionTypes.SERVICE_UPDATE);
export const deleteService = createAction(actionTypes.SERVICE_DELETE);

export const addUser = createAction(actionTypes.USER_ADD);
export const updateUser = createAction(actionTypes.USER_UPDATE);
export const deleteUser = createAction(actionTypes.USER_DELETE);

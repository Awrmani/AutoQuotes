import createAction from '@autoquotes/libraries/src/utils/createAction';
import * as actionTypes from '../constants/actionTypes';

// Async data fetches
export const fetchShopSettings = createAction(actionTypes.SHOP_SETTINGS_FETCH);
export const fetchCurrentUser = createAction(actionTypes.CURRENT_USER_FETCH);
export const fetchVehicleTypeList = createAction(
  actionTypes.VEHICLE_TYPE_LIST_FETCH
);

export const fetchServiceTypeList = createAction(
  actionTypes.SERVICE_TYPE_LIST_FETCH
);

export const fetchQuoteDetails = createAction(actionTypes.QUOTE_DETAILS_FETCH);

// Form submits & other actions altering backend state
export const login = createAction(actionTypes.LOGIN);

export const registerUser = createAction(actionTypes.USER_REGISTER);
export const updateUser = createAction(actionTypes.USER_UPDATE);

export const createQuote = createAction(actionTypes.QUOTE_CREATE);

export const addService = createAction(actionTypes.SERVICE_ADD);
export const removeService = createAction(actionTypes.SERVICE_REMOVE);

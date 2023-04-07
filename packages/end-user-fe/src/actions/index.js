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
export const fetchAppointmentOptions = createAction(
  actionTypes.APPOINTMENT_OPTIONS_FETCH
);

export const fetchQuoteList = createAction(actionTypes.QUOTE_LIST_FETCH);

export const fetchQuoteDetails = createAction(actionTypes.QUOTE_DETAILS_FETCH);

// Form submits & other actions altering backend state
export const login = createAction(actionTypes.LOGIN);

export const registerUser = createAction(actionTypes.USER_REGISTER);
export const updateUser = createAction(actionTypes.USER_UPDATE);
export const confirmUser = createAction(actionTypes.USER_CONFIRM);

export const createQuote = createAction(actionTypes.QUOTE_CREATE);
export const updateQuote = createAction(actionTypes.QUOTE_UPDATE);
export const finalizeQuote = createAction(actionTypes.QUOTE_FINALIZE);

export const addService = createAction(actionTypes.SERVICE_ADD);
export const removeService = createAction(actionTypes.SERVICE_REMOVE);

export const reqestOffers = createAction(actionTypes.OFFERS_REQUEST);

export const createAppointment = createAction(actionTypes.APPOINTMENT_CREATE);

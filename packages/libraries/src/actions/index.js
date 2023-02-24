import { createAction } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

export const pending = createAction(
  actionTypes.REQUEST_PENDING,
  p => p,
  (_, m) => m
);
export const success = createAction(
  actionTypes.REQUEST_SUCCESS,
  p => p,
  (_, m) => m
);
export const failure = createAction(
  actionTypes.REQUEST_FAILURE,
  p => p,
  (_, m) => m
);
export const cancel = createAction(
  actionTypes.QUERY_CANCEL,
  p => p,
  (_, m) => m
);

// token
export const setToken = createAction(
  actionTypes.TOKEN_SET,
  p => p,
  (_, m) => m
);

export const removeToken = createAction(
  actionTypes.TOKEN_REMOVE,
  p => p,
  (_, m) => m
);

// Form remove
export const destroyForm = createAction(
  actionTypes.FORM_DESTROY,
  p => p,
  (_, m) => m
);

// User mgt

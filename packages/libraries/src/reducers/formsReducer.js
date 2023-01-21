import { handleActions } from 'redux-actions';
import omit from 'lodash-es/omit';
import * as actionTypes from '../constants/actionTypes';

/**
 * This is a reducer responsible for handling a single form instance
 */
const formReducer = handleActions(
  {
    [actionTypes.REQUEST_PENDING]: () => ({
      isSubmitting: true,
      isSucceeded: false,
      isFailed: false,
    }),
    [actionTypes.REQUEST_SUCCESS]: (state, { payload }) => ({
      ...state,
      isSubmitting: false,
      isSucceeded: true,
      response: payload,
    }),
    [actionTypes.REQUEST_FAILURE]: (state, { payload }) => ({
      ...state,
      isSubmitting: false,
      isSucceeded: false,
      isFailed: true,
      error: payload,
    }),
  },
  {}
);

// This has a constant reference
const initialState = {};

const formsReducer = (state = initialState, action) => {
  const { formId } = action?.meta ?? {};

  if (!formId) return state;

  if (action.type === actionTypes.FORM_DESTROY) return omit(state, [formId]);

  return {
    ...state,
    [formId]: formReducer(state[formId], action),
  };
};

export default formsReducer;

// Selectors

export const getFormState = formId => state => state.forms[formId];

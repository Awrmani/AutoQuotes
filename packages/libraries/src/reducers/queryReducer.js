import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

const queryReducer = ({ triggerActionType, purgeActionTypes = [] }) => {
  if (typeof triggerActionType !== 'string')
    throw new Error(
      `Expected triggerActionType to be a string, but got ${typeof triggerActionType}`
    );

  if (!Array.isArray(purgeActionTypes))
    throw new Error('Expected purgeActionTypes to be an array of strings');

  const initialValue = {
    isFetching: false,
    isSucceeded: undefined,
    result: null,
  };

  const actionHandler = handleActions(
    {
      // Handle PENDING async action
      [actionTypes.REQUEST_PENDING]: state => ({
        ...state,
        error: null,
        isFetching: true,
      }),

      // handle SUCCESS async action
      [actionTypes.REQUEST_SUCCESS]: (state, { payload, meta }) => {
        const { result } = payload ?? {};
        const { status } = meta ?? {};

        return {
          ...state,
          lastStatusCode: status,
          isFetching: false,
          isSucceeded: true,
          isFailed: false,
          result: result ?? payload,
        };
      },

      // handle FAILURE async action
      [actionTypes.REQUEST_FAILURE]: (state, { payload }) => {
        const { status } = payload ?? {};

        return {
          ...state,
          lastStatusCode: status,
          error: payload,
          isFetching: false,
          isSucceeded: false,
          isFailed: true,
        };
      },

      // handle QUERY CANCEL
      [actionTypes.QUERY_CANCEL]: state => ({
        ...state,
        isFetching: false,
      }),
    },
    initialValue
  );

  return (state, action) => {
    if (
      ![
        actionTypes.QUERY_CANCEL,
        actionTypes.REQUEST_PENDING,
        actionTypes.REQUEST_SUCCESS,
        actionTypes.REQUEST_FAILURE,
        ...purgeActionTypes,
      ].includes(action.type)
    )
      return state ?? initialValue;

    // purge logic
    if (purgeActionTypes.includes(action.type)) return initialValue;

    // Match triggerActionType
    if (triggerActionType !== action.meta?.triggerActionType) return state;

    return actionHandler(state, action);

    // We do have work to do
  };
};

export default queryReducer;

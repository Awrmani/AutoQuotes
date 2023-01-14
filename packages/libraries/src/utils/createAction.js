import { v4 as uuid } from 'uuid';

/**
 * Curried function.
 *
 * @param {string} actionType the action type to be created.
 * @param {function} payloadFn fn, that generates the outgoing payload
 *   from incoming meta and payload
 * @param {function} metaFn fn, that generates the outgoing meta
 *   from incoming meta and payload
 * @return {function} the action creator function
 *
 * This mimics redux-actions` createAction with two differences
 * - Passes meta through by default
 * - adds actionId to meta, so async actions are able to track the progress
 */

const createAction = (actionType, payloadFn, metaFn) => (p, m) => ({
  type: actionType,
  payload: payloadFn?.(p, m) ?? p,
  meta: {
    actionId: uuid(),
    ...(metaFn?.(p, m) ?? m),
  },
});

export default createAction;

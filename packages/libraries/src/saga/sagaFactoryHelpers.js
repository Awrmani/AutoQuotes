import { call, fork, join, put, delay } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { success } from '../actions';

export const DISPATCH_SUCCESS_ACTION = 'DISPATCH_SUCCESS_ACTION';
export const WEDGE_GLOBAL_INTERCEPTORS_HERE = 'WEDGE_GLOBAL_INTERCEPTORS_HERE';
export const SKIP_GLOBAL_INTERCEPTORS = 'SKIP_GLOBAL_INTERCEPTORS';

/*
 * This function gets an async "trigger action" as param,
 * It then mines the triggerActionId and instructs take()
 * to wait for that async action to finish
 *
 * Usage:
 * const asyncActionResult = yield take(waitFor(yield put(actionTypes.doSg({ params }))))
 */
export const waitFor = triggerAction => {
  const waitForId = triggerAction?.meta?.actionId;

  if (typeof waitForId !== 'string')
    throw new Error(
      'The awaited async trigger action Id is expected to be a string'
    );

  return testedAction => {
    const testedId = testedAction?.meta?.triggerActionId;

    if (!testedId) return false;

    return (
      waitForId === testedId &&
      [
        actionTypes.REQUEST_SUCCESS,
        actionTypes.REQUEST_FAILURE,
        actionTypes.QUERY_CANCEL,
      ].includes(testedAction.type)
    );
  };
};

/**
 * We execute success functions in parallel groups before the
 * success action is dispatched, so a confirmation to
 * the user can be delayed until all the required data refetches
 * are made to update the UI
 *
 * Note, we are doing a delay before the success action is dispatched
 * Because of React 18 batching. FlushSync will not work with generator
 * functions either
 *
 * https://react-redux.js.org/api/batch
 * https://github.com/reactwg/react-18/discussions/21
 * https://reactjs.org/docs/react-dom.html#flushsync

 */
export function* handleSuccesses({ successGroups: successGroupsRaw, params }) {
  // Make sure success event is dispatched
  const successGroups = successGroupsRaw.includes(DISPATCH_SUCCESS_ACTION)
    ? successGroupsRaw
    : [...successGroupsRaw, DISPATCH_SUCCESS_ACTION];

  // Run successGroups sequentially
  for (const successGroup of successGroups) {
    if (Array.isArray(successGroup)) {
      // Run items in a group in parallel
      let forkedTasks = [];
      for (const successHandler of successGroup) {
        forkedTasks = [...forkedTasks, yield fork(successHandler, ...params)];
      }

      // Wait for all items of the group to finish
      if (forkedTasks.length) yield join(forkedTasks);
    } else if (successGroup === DISPATCH_SUCCESS_ACTION) {
      // We got dispatchSuccess string instead of a success group, so let's do that

      // React 18 batches updates. This is a way to force refreshed data
      // to propagate to React before success action is dispatched
      yield delay(100);
      yield put(success(...params));
    }
  }
}

/**
 * Generate the exact sequence in which the interceptors will run
 * in the given chain (request, response, error)
 * WEDGE_GLOBAL_INTERCEPTORS_HERE is at the beginning if not instructed otherwise
 */
export function assembleInterceptorChain(global = [], effect = []) {
  if (effect.includes(SKIP_GLOBAL_INTERCEPTORS))
    return effect.filter(e => typeof e !== 'string');

  // If not otherwise instructed, run global interceptors first
  if (!effect.includes(WEDGE_GLOBAL_INTERCEPTORS_HERE))
    return [...global, ...effect];

  // Inject global interceptors to the indicated place
  return effect.reduce(
    (acc, item) =>
      item === WEDGE_GLOBAL_INTERCEPTORS_HERE
        ? [...acc, ...global]
        : [...acc, item],
    []
  );
}

/**
 * run the given interceptor chain, start with the original value and let
 * each interceptor mutate the output of the last. All interceptors can receive
 * additional relevant information like sagaConfig or the original trigger action
 * The output of the last interceptor in the chain will be returned
 */
export function* runInterceptorChain(
  interceptorChain,
  originalValue,
  additionalParams
) {
  let value = originalValue;

  for (let i = 0; i < interceptorChain.length; i += 1) {
    value =
      (yield call(interceptorChain[i], value, ...additionalParams)) || value;
  }

  return value;
}

import { call, cancelled, put } from 'redux-saga/effects';
import { pending, failure, cancel } from '../actions';

import {
  assembleInterceptorChain,
  runInterceptorChain,
  handleSuccesses,
  DISPATCH_SUCCESS_ACTION,
  WEDGE_GLOBAL_INTERCEPTORS_HERE,
  SKIP_GLOBAL_INTERCEPTORS,
} from './sagaFactoryHelpers';

/**
 * Main apiCallSaga engine (curried Fn)
 *
 * This is an Async process engine, for managing data fetching,
 * submitting, refetching, mutating and dependency handling.
 *
 * I.e., it is possible to create a "Saga effect", that takes the original
 * (AKA. "Trigger action"), mutates it (I.e., adds the user's token),
 * sends it to e pre-configured fetch function, waits for it's finish
 * then mutates it's response (or error if needed), then finally submits it
 * into the store again.
 *
 * Function layer 1 receives globalConfig object containing request-
 * response- and error interceptors that should be executed for all
 * (returns a function that is layer 2)
 *
 * Function layer 2, receives a per-effect config ("sagaConfig"), and
 * the original, "trigger action".
 *
 * It then
 * - Mutates the trigger action's data
 * - Dispatches a "PENDING" action
 * - Calls the API fn, waits for it's response
 * - Mutates the api results (weather it's success or error)
 * - Executes the "success handlers" (chain of parallelly run tasks)
 * - dispatches the "SUCCESS" or "ERROR" action into the store
 */
export const apiCallSagaFactory = (globalConfig = {}) => {
  function* apiCallSaga(sagaConfig, originalTriggerAction) {
    const { apiFn, onSuccess = [] } = sagaConfig;

    const requestInterceptors = assembleInterceptorChain(
      globalConfig.requestInterceptors,
      sagaConfig.requestInterceptors
    );

    const responseInterceptors = assembleInterceptorChain(
      globalConfig.responseInterceptors,
      sagaConfig.responseInterceptors
    );

    const errorInterceptors = assembleInterceptorChain(
      globalConfig.errorInterceptors,
      sagaConfig.errorInterceptors
    );

    let triggerAction;
    let triggerActionBundle;

    try {
      // Transform incoming action with the request interceptors
      triggerAction = yield call(
        runInterceptorChain,
        requestInterceptors,
        originalTriggerAction,
        [sagaConfig]
      );

      const {
        type: triggerActionType,
        payload: triggerPayload = {},
        meta: { actionId: triggerActionId, ...triggerMeta } = {},
      } = triggerAction;

      triggerActionBundle = {
        triggerActionType,
        params: triggerPayload,
        triggerActionId,
        ...triggerMeta,
      };

      yield put(pending(null, triggerActionBundle));

      const originalResponse = yield call(apiFn, triggerPayload, triggerMeta);
      // Transform API response with the response interceptors
      const { data, ...responseRest } = yield call(
        runInterceptorChain,
        responseInterceptors,
        originalResponse,
        [sagaConfig, triggerAction]
      );

      yield call(handleSuccesses, {
        successGroups: onSuccess,
        params: [
          data,
          {
            ...triggerActionBundle,
            ...responseRest,
          },
        ],
      });

      return null;
    } catch (originalError) {
      let error;

      try {
        // Transform the error object with the errorInterceptors
        error = yield call(
          runInterceptorChain,
          errorInterceptors,
          originalError,
          [sagaConfig, triggerAction]
        );
      } catch (errorInterceptorError) {
        // eslint-disable-next-line no-console
        console.error(
          'An error interceptor also encountered an error, ',
          errorInterceptorError
        );
        error = originalError;
      }

      yield put(failure(error, triggerActionBundle));

      return null;
    } finally {
      const isCancelled = yield cancelled();

      if (isCancelled) yield put(cancel(null, triggerActionBundle));
    }
  }

  apiCallSaga.DISPATCH_SUCCESS_ACTION = DISPATCH_SUCCESS_ACTION;
  apiCallSaga.WEDGE_GLOBAL_INTERCEPTORS_HERE = WEDGE_GLOBAL_INTERCEPTORS_HERE;
  apiCallSaga.SKIP_GLOBAL_INTERCEPTORS = SKIP_GLOBAL_INTERCEPTORS;

  return apiCallSaga;
};

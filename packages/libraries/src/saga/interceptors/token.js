import { put, select } from 'redux-saga/effects';
import { setToken } from '../../actions';
import { getToken } from '../../reducers/tokenReducer';

/**
 * This success handler is responsible for dispatching a token set
 * action into the store
 */
export const earlySetToken = function* ({ result }) {
  if (result?.token) yield put(setToken(result));
};

/**
 * This request interceptor takes the token from the store
 * and adds it to the action so the BE can authenticate the user
 * by it
 */
export function* addTokenRequestInterceptor(
  { meta = {}, ...rest },
  { noInjectToken }
) {
  if (noInjectToken) return undefined;

  const authorization = yield select(getToken);

  return {
    ...rest,
    meta: {
      ...(authorization && { authorization: `Bearer ${authorization}` }),
      ...meta,
    },
  };
}

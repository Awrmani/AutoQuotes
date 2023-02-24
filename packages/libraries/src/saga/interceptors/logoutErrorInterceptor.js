import { put } from 'redux-saga/effects';
import { removeToken } from '../../actions';

function* logoutErrorInterceptor({ status } = {}) {
  if (status === 401) {
    yield put(removeToken());
  }
}

export default logoutErrorInterceptor;

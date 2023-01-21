import { all, takeLatest } from 'redux-saga/effects';
import { BOOTSTRAPPED } from '@autoquotes/libraries/src/constants/actionTypes';
// import { apiCallSagaFactory } from '@autoquotes/libraries/src/saga/apiCallSagaFactory';
// import { errorTranslationInterceptor } from '@autoquotes/libraries/src/saga/interceptors/errorTranslation';

/*
const apiCall = apiCallSagaFactory({
  // These are interceptors that are added globally -- All apiCall sagas execute it
  requestInterceptors: [],
  responseInterceptors: [
    // normalizeResponseInterceptor,
  ],
  errorInterceptors: [errorTranslationInterceptor],
});
*/
const initApp = () => {
  // Just a placeholder for now
};

export default function* root() {
  yield all([
    // Internal
    takeLatest(BOOTSTRAPPED, initApp),
  ]);
}

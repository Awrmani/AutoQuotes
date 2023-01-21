import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import lsStorageEngine from 'redux-persist/lib/storage';
import formsReducer from '@autoquotes/libraries/src/reducers/formsReducer';
import tokenReducer from '@autoquotes/libraries/src/reducers/tokenReducer';

// Root reducer
const rootReducer = combineReducers({
  forms: formsReducer,
  token: tokenReducer,
});

const rootPersistConfig = {
  // LocalStorage versioning for migration
  version: 1,
  keyPrefix: 'AutoQuotesThirdParty.',
  key: 'root',
  whitelist: ['token'],
  storage: lsStorageEngine,
};

export default persistReducer(rootPersistConfig, rootReducer);

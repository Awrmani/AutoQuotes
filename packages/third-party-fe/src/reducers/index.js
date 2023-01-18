import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import lsStorageEngine from 'redux-persist/lib/storage';
import formsReducer from '@autoquotes/libraries/src/reducers/formsReducer';

// Root reducer
const rootReducer = combineReducers({
  forms: formsReducer,
});

const rootPersistConfig = {
  // LocalStorage versioning for migration
  version: 1,
  keyPrefix: 'AutoQuotesThirdParty.',
  key: 'root',
  whitelist: [],
  storage: lsStorageEngine,
};

export default persistReducer(rootPersistConfig, rootReducer);

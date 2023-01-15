import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import lsStorageEngine from 'redux-persist/lib/storage';

const dummyReducer = () => true;

// Root reducer
const rootReducer = combineReducers({
  dummy: dummyReducer,
});

const rootPersistConfig = {
  // LocalStorage versioning for migration
  version: 1,
  keyPrefix: 'AutoQuotesLicensing.',
  key: 'root',
  whitelist: [],
  storage: lsStorageEngine,
};

export default persistReducer(rootPersistConfig, rootReducer);

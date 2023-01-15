import { createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { BOOTSTRAPPED } from '../constants/actionTypes';
import enhancerCreator from './createEnhancer';

/**
 * This fn creates the store, and enhances it with persist + hydration
 * and Saga capabilities.
 *
 * Returns the enhanced store object
 */
const prepareStore = ({ rootReducer, sagas }) => {
  const sagaMiddleware = createSagaMiddleware({});

  const enhancer = enhancerCreator({ sagaMiddleware });

  const store = createStore(rootReducer, undefined, enhancer);

  store.persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  store.rehydrate = () =>
    new Promise(resolve => {
      let unsubscribe;
      const handlePersistorState = () => {
        const { bootstrapped: isReady } = store.persistor.getState();
        if (isReady) {
          resolve(store);
          if (unsubscribe) {
            unsubscribe();
          }
        }
      };
      unsubscribe = store.persistor.subscribe(handlePersistorState);
      handlePersistorState();
    });

  return store;
};

/**
 * This Fn builds the redux store, and returns a promise which
 * resolves to the store once rehydration is complete
 */

const buildStore = ({ rootReducer, sagas }) => {
  const store = prepareStore({
    rootReducer,
    sagas,
  });

  const storePromise = store.rehydrate().then(() => {
    store.dispatch({ type: BOOTSTRAPPED });
    return store;
  });

  return storePromise;
};

export default buildStore;

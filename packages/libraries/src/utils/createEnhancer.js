import { applyMiddleware, compose } from 'redux';

const createEnhancer = ({ sagaMiddleware }) => {
  if (process.env.NODE_ENV !== 'development')
    return applyMiddleware(sagaMiddleware);

  /**
   * redux-devtools-extension
   * https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
   */

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = global?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'AutoQuotes',
        shouldCatchErrors: false,
      })
    : compose;
  /* eslint-enable */

  return composeEnhancers(applyMiddleware(sagaMiddleware));
};

export default createEnhancer;

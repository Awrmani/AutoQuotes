import { applyMiddleware, compose } from 'redux';
import devtoolsActionSanitizer from './devtoolsActionSanitizer';

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
        actionSanitizer: devtoolsActionSanitizer,
      })
    : compose;
  /* eslint-enable */

  return composeEnhancers(applyMiddleware(sagaMiddleware));
};

export default createEnhancer;

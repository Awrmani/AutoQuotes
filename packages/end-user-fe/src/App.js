import React, { useEffect, useState } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { set } from 'lodash';
import buildStore from '@autoquotes/libraries/src/utils/buildStore';
import MuiThemeProvider from '@autoquotes/common/src/components/MuiThemeProvider';
import rootReducer from './reducers';
import sagas from './sagas';

const storePromise = buildStore({ rootReducer, sagas });

const App = () => {
  const [store, setStore] = useState(null);

  // Wait for redux store to rehydrate, then set it to `store`
  useEffect(() => {
    storePromise.then(s => {
      setStore(s);
      /**
       * If we are in dev mode, make store available on the browser's
       * window object. This helps the e2e test suite prepare for tests,
       * I.e., programmatically logging users in
       */
      if (process.env.NODE_ENV === 'development') {
        set(window, ['AutoQuotes', 'store'], s);
      }
    });
  }, []);

  if (!store) return null;

  return (
    <StoreProvider store={store}>
      <MuiThemeProvider>
        <div>End-user front-end</div>
      </MuiThemeProvider>
    </StoreProvider>
  );
};

export default App;

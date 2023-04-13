import React, { useEffect, useState } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { set } from 'lodash';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import buildStore from '@autoquotes/libraries/src/utils/buildStore';
import MuiThemeProvider from '@autoquotes/common/src/components/MuiThemeProvider';
import rootReducer from './reducers';
import sagas from './sagas';
import Routes from './Routes';

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
    <>
      <ToastContainer />
      <StoreProvider store={store}>
        <MuiThemeProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </MuiThemeProvider>
      </StoreProvider>
    </>
  );
};

export default App;

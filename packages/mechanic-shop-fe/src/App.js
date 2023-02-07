import React, { useEffect, useState } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
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
    storePromise.then(setStore);
  }, []);

  if (!store) return null;

  return (
    <StoreProvider store={store}>
      <MuiThemeProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MuiThemeProvider>
    </StoreProvider>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import buildStore from '@autoquotes/libraries/src/utils/buildStore';
import LoginScreen from './screens/LoginScreen';
import rootReducer from './reducers';
import sagas from './sagas';

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
      <div>Mechanic shop front-end</div>
      <LoginScreen />
    </StoreProvider>
  );
};

export default App;

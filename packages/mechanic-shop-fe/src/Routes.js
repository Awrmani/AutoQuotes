import { Routes as RrdRoutes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '@autoquotes/libraries/src/reducers/tokenReducer';
import ProtectedRoute from '@autoquotes/common/src/components/ProtectedRoute';
import ShopLayout from './components/ShopLayout';
import ShopLoginScreen from './screens/ShopLoginScreen';
import ShopDashboardScreen from './screens/ShopDashboardScreen';
import paths from './paths';
import InventoryScreen from './screens/InventoryScreen';
import ItemFormScreen from './screens/ItemFormScreen';
import SingleItemViewScreen from './screens/SingleItemViewScreen';

const Routes = () => {
  // If the user is logged in, they will have a token
  const token = useSelector(getToken);

  return (
    <RrdRoutes>
      <Route
        // We only want to show these when the user is logged in
        element={
          <ProtectedRoute doRedirect={!token} redirectPath={paths.login()} />
        }
      >
        <Route
          // Render the layout component around all other logged in routes
          element={<ShopLayout />}
        >
          {/* Add all authenticated routes here */}
          <Route
            path={paths.dashboard().pathname}
            element={<ShopDashboardScreen />}
          />
          <Route
            path={paths.inventory().pathname}
            element={<InventoryScreen />}
          />

          <Route
            path={paths.itemForm().pathname}
            element={<ItemFormScreen />}
          />

          <Route
            path={paths.SingleItemView().pathname}
            element={<SingleItemViewScreen />}
          />
        </Route>
      </Route>

      <Route
        // We only want to show these when the user is *NOT* logged in
        element={
          <ProtectedRoute
            doRedirect={!!token}
            redirectPath={paths.dashboard()}
          />
        }
      >
        {/* Add all UNauthenticated routes here */}
        <Route path={paths.login().pathname} element={<ShopLoginScreen />} />
      </Route>

      {/* If no other route matches, let's fall back to Dashboard */}
      <Route path="*" element={<Navigate to={paths.dashboard()} replace />} />
    </RrdRoutes>
  );
};

export default Routes;

import { Routes as RrdRoutes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '@autoquotes/libraries/src/reducers/tokenReducer';
import ProtectedRoute from '@autoquotes/common/src/components/ProtectedRoute';
import ShopLayout from './components/ShopLayout';
import ShopLoginScreen from './screens/ShopLoginScreen';
import ShopDashboardScreen from './screens/ShopDashboardScreen';
import paths from './paths';
import PartListScreen from './screens/PartListScreen';
import AddPartScreen from './screens/AddPartScreen';
import EditPartScreen from './screens/EditPartScreen';
import ServiceListScreen from './screens/ServiceListScreen';
import EditServiceScreen from './screens/EditServiceScreen';
import AddServiceScreen from './screens/AddServiceScreen';
import ShopSettingsScreen from './screens/ShopSettingsScreen';

import UserListScreen from './screens/UserListScreen';

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
            path={paths.partList().pathname}
            element={<PartListScreen />}
          />
          <Route path={paths.addPart().pathname} element={<AddPartScreen />} />
          <Route
            path={paths.editPart().pathname}
            element={<EditPartScreen />}
          />
          <Route
            path={paths.serviceList().pathname}
            element={<ServiceListScreen />}
          />
          <Route
            path={paths.addService().pathname}
            element={<AddServiceScreen />}
          />
          <Route
            path={paths.editService().pathname}
            element={<EditServiceScreen />}
          />
          <Route
            path={paths.userList().pathname}
            element={<UserListScreen />}
          />
          <Route
            path={paths.shopSettings().pathname}
            element={<ShopSettingsScreen />}
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

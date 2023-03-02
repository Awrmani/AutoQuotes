import { Routes as RrdRoutes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '@autoquotes/libraries/src/reducers/tokenReducer';
import ProtectedRoute from '@autoquotes/common/src/components/ProtectedRoute';
import EndUserLayout from './components/EndUserLayout';
import paths from './paths';
import UserLoginScreen from './screens/UserLoginScreen';
import UserRegistrationScreen from './screens/UserRegistrationScreen';
import EndUserQuotingPageScreen from './screens/EndUserQuotingPageScreen';

const Routes = () => {
  // If the user is logged in, they will have a token
  const token = useSelector(getToken);
  return (
    <RrdRoutes>
      <Route
        // Render the layout component around all routes
        element={<EndUserLayout />}
      >
        {/* Add all Unauthenticated routes here */}
        <Route path={paths.login().pathname} element={<UserLoginScreen />} />
        <Route
          path={paths.registration().pathname}
          element={<UserRegistrationScreen />}
        />
        <Route
          path={paths.quotingPage().pathname}
          element={<EndUserQuotingPageScreen />}
        />
      </Route>
      <Route
        // We only want to show these when the user is logged in
        element={
          <ProtectedRoute doRedirect={!token} redirectPath={paths.login()} />
        }
      >
        {/* Add all authenticated routes here */}
      </Route>
      {/* If no other route matches, let's fall back to quotingPage */}
      <Route path="*" element={<Navigate to={paths.quotingPage()} replace />} />
    </RrdRoutes>
  );
};

export default Routes;

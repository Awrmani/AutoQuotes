import { Routes as RrdRoutes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '@autoquotes/libraries/src/reducers/tokenReducer';
import ProtectedRoute from '@autoquotes/common/src/components/ProtectedRoute';
import EndUserLayout from './components/EndUserLayout';
import paths from './paths';
import UserLoginScreen from './screens/UserLoginScreen';
import UserRegistrationScreen from './screens/UserRegistrationScreen';
import EndUserQuotingPageScreen from './screens/EndUserQuotingPageScreen';
import EndUserProfileScreen from './screens/EndUserProfileScreen';
import UserConfirmationScreen from './screens/UserConfirmationScreen';
import ConfirmingEmailScreen from './screens/ConfirmingEmailScreen';
import UserQuotesScreen from './screens/UserQuotesScreen';
import AppointmentScreen from './screens/AppointmentScreen';

const Routes = () => {
  // If the user is logged in, they will have a token
  const token = useSelector(getToken);
  return (
    <RrdRoutes>
      <Route
        // Render the layout component around all routes
        element={<EndUserLayout />}
      >
        <Route
          // We only want to show these when the user is *NOT* logged in
          element={
            <ProtectedRoute
              doRedirectIf={!!token}
              defaultRedirectPath={paths.quotingPage({})}
            />
          }
        >
          {/* Add all Unauthenticated routes here */}
          <Route path={paths.login().pathname} element={<UserLoginScreen />} />
          <Route
            path={paths.registration().pathname}
            element={<UserRegistrationScreen />}
          />
          <Route
            path={paths.confirmingEmail().pathname}
            element={<ConfirmingEmailScreen />}
          />
        </Route>
        <Route
          path={paths.quotingPage().pathname}
          element={<EndUserQuotingPageScreen />}
        />
        <Route
          // We only want to show these when the user is logged in
          element={
            <ProtectedRoute
              doRedirectIf={!token}
              defaultRedirectPath={paths.login()}
            />
          }
        >
          {/* Add all authenticated routes here */}
          <Route
            path={paths.profile().pathname}
            element={<EndUserProfileScreen />}
          />
          <Route
            path={paths.userQuotes().pathname}
            element={<UserQuotesScreen />}
          />
          <Route
            path={paths.appointment().pathname}
            element={<AppointmentScreen />}
          />
        </Route>
      </Route>

      {/* Routes that are available independent of login state */}
      <Route
        path={paths.emailConfirmation().pathname}
        element={<UserConfirmationScreen />}
      />

      {/* If no other route matches, let's fall back to quotingPage */}
      <Route
        path="*"
        element={<Navigate to={paths.quotingPage({})} replace />}
      />
    </RrdRoutes>
  );
};

export default Routes;

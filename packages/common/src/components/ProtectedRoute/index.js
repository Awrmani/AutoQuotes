import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ doRedirectIf, defaultRedirectPath }) => {
  /**
   * This is needed for login / registration to redirect to a
   * specific page after token is obtained (instead ofthe default
   * screen)
   *
   * We can attach a state to the navigation object to specify this
   */

  const { redirectPath } = useLocation()?.state ?? {};

  if (doRedirectIf)
    return <Navigate to={redirectPath ?? defaultRedirectPath} replace />;

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  doRedirectIf: PropTypes.bool.isRequired,
  defaultRedirectPath: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};

export default ProtectedRoute;

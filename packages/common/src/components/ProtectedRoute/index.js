import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ doRedirect, redirectPath }) => {
  if (doRedirect) return <Navigate to={redirectPath} replace />;

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  doRedirect: PropTypes.bool.isRequired,
  redirectPath: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};

export default ProtectedRoute;

import { Routes as RrdRoutes, Route } from 'react-router-dom';
import paths from './paths';
import QuoteRequestScreen from './screens/QuoteRequestScreen';

const Routes = () => {
  return (
    <RrdRoutes>
      {/* Add all authenticated routes here */}
      <Route
        path={paths.quoteRequest().pathname}
        element={<QuoteRequestScreen />}
      />
    </RrdRoutes>
  );
};

export default Routes;

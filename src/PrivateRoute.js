import React from 'react';
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ element: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      element={isLoggedIn ? Component : <Navigate to="/login" />}
    />
  );
}

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default PrivateRoute;

import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { isAuthenticated, authLoading },
  } = useContext(AuthContext);
  if (authLoading) {
    return "Loading user";
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

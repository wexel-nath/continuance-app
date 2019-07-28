import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Redirect to={{ pathname: "/login" }} />;
  }
  return <Route {...rest} render={() => children} />;
};

export default PrivateRoute;

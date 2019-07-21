import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, loggedIn, ...rest }) => {
  if (!loggedIn) {
    // check tokens
    return <Redirect to={{ pathname: "/login" }} />;
  }
  return <Route {...rest} render={() => children} />;
};

const mapStateToProps = ({ auth: { loggedIn } }) => {
  return { loggedIn };
};

export default connect(mapStateToProps)(PrivateRoute);

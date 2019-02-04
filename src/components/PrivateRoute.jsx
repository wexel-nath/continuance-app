import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ loggedIn, children, ...rest }) => {
  if (!loggedIn) {
    return <Redirect to={{ pathname: "/login" }} />;
  }
  return <Route {...rest} render={() => children} />;
};

const mapStateToProps = state => {
  return { loggedIn: state.auth.loggedIn };
};

export default connect(mapStateToProps)(PrivateRoute);

import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ loggedIn, children, ...rest }) => {
  const component = !loggedIn ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : (
    children
  );
  return <Route {...rest} render={() => component} />;
};

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

export default connect(mapStateToProps)(PrivateRoute);

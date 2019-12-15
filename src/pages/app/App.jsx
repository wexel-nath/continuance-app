import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Content from "./Content";
import Header from "../../components/header/Header";
import history from "../../history";
import Login from "../login/Login";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../../context/AuthContext";

const App = () => {
  const { location: loc } = window;
  const redirectPath =
    loc.pathname === "/login" ? "/" : loc.pathname + loc.search;
  return (
    <Router history={history}>
      <AuthProvider redirectPath={redirectPath}>
        <Switch>
          <Route component={Login} exact path="/login" />
          <PrivateRoute path="/">
            <Header />
            <Content />
          </PrivateRoute>
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;

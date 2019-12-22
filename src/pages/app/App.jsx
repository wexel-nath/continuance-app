import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import FramedContent from "./FramedContent";
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
        <CssBaseline />

        <Switch>
          <Route component={Login} exact path="/login" />
          <PrivateRoute path="/">
            <FramedContent />
          </PrivateRoute>
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;

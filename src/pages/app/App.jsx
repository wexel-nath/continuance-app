import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Content from "./Content";
import Header from "../../components/header/Header";
import history from "../../history";
import Login from "../login/Login";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <Router history={history}>
      <React.Fragment>
        <Header />

        <Switch>
          <Route component={Login} exact path="/login" />
          <PrivateRoute path="/">
            <Content />
          </PrivateRoute>
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Content from "./Content";
import Header from "./header/Header";
import Login from "./login/Login";

import "./App.css";

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Header />

        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/">
            <Content />
          </PrivateRoute>
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App;

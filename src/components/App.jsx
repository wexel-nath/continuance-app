import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Content from "./Content";
import Header from "./header/Header";
import Login from "./login/Login";
import "./App.css";

class App extends React.Component {
  state = {
    content: "",
    loggedIn: false,
    user: {
      username: "",
      first_name: "",
      last_name: ""
    }
  };

  onLogin = user => {
    this.setState({
      loggedIn: true,
      user: user
    });
  };

  onLogout = () => {
    this.setState({
      loggedIn: false,
      user: {
        username: "",
        first_name: "",
        last_name: ""
      }
    });
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header
            first_name={this.state.user.first_name}
            loggedIn={this.state.loggedIn}
            onLogout={this.onLogout}
          />

          <Switch>
            <Route
              exact
              path="/login"
              render={() => <Login onLogin={this.onLogin} />}
            />
            <PrivateRoute
              path="/"
              signedIn={this.state.loggedIn}
              component={Content}
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;

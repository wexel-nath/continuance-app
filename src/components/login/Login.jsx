import React from "react";
import logo from "../../img/continuance_logo.jpg";
import login from "../../api/authentication";
import "./Login.css";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  onUsernameChange = event => {
    this.setState({ username: event.target.value, error: "" });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value, error: "" });
  };

  onLoginSubmit = event => {
    event.preventDefault();

    const response = login(this.state.username, this.state.password);
    if (response.hasOwnProperty("error")) {
      this.setState({ error: response.error });
      return;
    }
    this.props.onLogin({
      first_name: response.first_name,
      username: response.username
    });
  };

  getErrorMessage() {
    return (
      this.state.error !== "" && (
        <div className="ui warning message">{this.state.error}</div>
      )
    );
  }

  render() {
    return (
      <div className="ui container login-wrapper">
        <div className="ui segment login-card">
          <form className="ui form" onSubmit={this.onLoginSubmit}>
            <img className="ui image" src={logo} alt="continuance-logo" />
            <div className="ui fluid large input">
              <input
                type="text"
                onChange={this.onUsernameChange}
                value={this.state.username}
                placeholder="Username"
              />
            </div>
            <div className="ui fluid large input password-input">
              <input
                type="password"
                onChange={this.onPasswordChange}
                value={this.state.password}
                placeholder="Password"
              />
            </div>
            <div className="ui warning message">{this.state.error}</div>
            <button className="ui primary fluid large button login-button">
              Login
            </button>
          </form>
          {this.getErrorMessage()}
        </div>
      </div>
    );
  }
}

export default Login;

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleLogIn } from "../../actions";

import logo from "../../img/continuance_logo.jpg";
import "./Login.css";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  onUsernameChange = event => {
    this.setState({ username: event.target.value, error: "" });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value, error: "" });
  };

  onLoginSubmit = event => {
    event.preventDefault();
    this.props.handleLogIn(this.state.username, this.state.password);

    // TODO: user custom history object and push from reducer
    this.props.history.push("/");
  };

  renderErrorMessage(error) {
    return <div className="ui warning message">{error}</div>;
  }

  render() {
    const { error } = this.props;
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
          {error && this.renderErrorMessage(error)}
          <div className="ui horizontal divider">OR</div>
          <button className="ui red fluid large button login-button">
            <i className="google icon" />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  { handleLogIn }
)(withRouter(Login));

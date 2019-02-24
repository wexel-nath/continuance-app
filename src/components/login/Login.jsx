import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";

import { handleLogIn } from "../../actions";

import logo from "../../img/continuance_logo.jpg";
import "./Login.css";

class Login extends React.Component {
  onLoginSubmit = ({ username, password }) => {
    this.props.handleLogIn(username, password);
  };

  maybeRenderErrorMessage(error) {
    return error && <div className="ui warning message">{error}</div>;
  }

  renderInput({ input, type, placeholder, meta }) {
    const { error, touched } = meta;
    return (
      <div className="field">
        <div className="ui fluid large input">
          <input {...input} type={type} placeholder={placeholder} />
        </div>
        {error && touched && (
          <div className="ui pointing red basic label">{error}</div>
        )}
      </div>
    );
  }

  render() {
    const { loggedIn, authError, handleSubmit } = this.props;
    if (loggedIn) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <div className="ui container login-wrapper">
        <div className="ui segment login-card">
          <form className="ui form" onSubmit={handleSubmit(this.onLoginSubmit)}>
            <img className="ui image" src={logo} alt="continuance-logo" />
            <Field
              name="username"
              component={this.renderInput}
              type="text"
              placeholder="Username"
            />
            <Field
              name="password"
              component={this.renderInput}
              type="password"
              placeholder="Password"
            />
            <button className="ui primary fluid large button login-button">
              Login
            </button>
          </form>
          {this.maybeRenderErrorMessage(authError)}
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

const validate = ({ username, password }) => {
  const errors = {};

  if (!username) {
    errors.username = "Enter your username";
  }

  if (!password) {
    errors.password = "Enter your password";
  }

  return errors;
};

const form = reduxForm({
  form: "login",
  validate
})(Login);

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    authError: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  { handleLogIn }
)(form);

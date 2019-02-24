import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";

import { handleLogIn } from "../../actions";

import logo from "../../img/continuance_logo.jpg";
import "./Login.css";

class Login extends React.Component {
  maybeRenderErrorMessage(error) {
    return error && <div className="ui warning message">{error}</div>;
  }

  renderInput({ input, meta: { error, touched }, placeholder, type }) {
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
    const { loggedIn, authError, handleSubmit, handleLogIn } = this.props;
    if (loggedIn) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <div className="ui container login-wrapper">
        <div className="ui segment login-card">
          <form className="ui form" onSubmit={handleSubmit(handleLogIn)}>
            <img className="ui image" src={logo} alt="continuance-logo" />
            <Field
              component={this.renderInput}
              name="username"
              placeholder="Username"
              type="text"
            />
            <Field
              component={this.renderInput}
              name="password"
              placeholder="Password"
              type="password"
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

const formFunc = reduxForm({
  form: "login",
  validate
})(Login);

const mapStateToProps = ({ auth }) => {
  return {
    authError: auth.error,
    loggedIn: auth.loggedIn
  };
};

export default connect(
  mapStateToProps,
  { handleLogIn }
)(formFunc);

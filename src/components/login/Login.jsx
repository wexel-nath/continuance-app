import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";

import { handleLogin, handleGetUser } from "../../actions";
import { renderTextInput } from "../helper/formHelpers";

import logo from "../../img/continuance_logo.jpg";
import "./Login.css";

class Login extends React.Component {
  componentDidMount() {
    this.props.handleGetUser();
  }

  render() {
    const { loggedIn, err, isFetching, handleSubmit, handleLogin } = this.props;
    if (loggedIn) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <div className="ui container login-wrapper">
        <div className="ui segment login-card">
          <form className="ui form" onSubmit={handleSubmit(handleLogin)}>
            <img className="ui image" src={logo} alt="continuance-logo" />
            <Field
              component={renderTextInput}
              name="username"
              placeholder="Username"
              type="text"
            />
            <Field
              component={renderTextInput}
              name="password"
              placeholder="Password"
              type="password"
            />
            <button
              className="ui primary fluid large button login-button"
              disabled={isFetching}
            >
              Login
            </button>
          </form>
          {err && <div className="ui warning message">{err}</div>}
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

const mapStateToProps = ({ auth: { error, loggedIn, isFetching } }) => {
  return {
    err: error,
    loggedIn,
    isFetching
  };
};

export default connect(
  mapStateToProps,
  { handleLogin, handleGetUser }
)(formFunc);

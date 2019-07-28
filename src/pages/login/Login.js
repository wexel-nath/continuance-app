import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { camelizeKeys as toCamelCase } from "humps";

import { Input } from "../../components/helper/formHelpers";
import useForm from "../../components/helper/useForm";
import { login, getUser } from "../../api/authentication";
import { setUser } from "../../actions";
import {
  getJwt,
  getRefresh,
  setJwt,
  setRefresh,
  clearTokens
} from "../../util/storage";

import logo from "../../img/continuance_logo.jpg";
import "./Login.css";

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

const useLogin = () => {
  const [user, setUser] = useState({});
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ username, password }) => {
    setLoading(true);
    const {
      data: { data, meta },
      statusText
    } = await login(username, password);
    setLoading(false);

    if (data) {
      const { jwt, refreshToken, user: userData } = toCamelCase(data);
      setJwt(jwt);
      setRefresh(refreshToken);
      setUser(userData);
    } else {
      setErr(meta || statusText);
    }
  };

  const isLoggedIn = async () => {
    if (!getJwt() || !getRefresh()) {
      clearTokens();
      return;
    }
    setLoading(true);
    const {
      data: { data }
    } = await getUser();
    if (data) {
      setUser(toCamelCase(data));
    } else {
      setErr("Session timed out.");
      setLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const formValues = useForm(handleLogin, validate);
  return [formValues, user, err, loading];
};

const NewLogin = ({ setUser, loggedIn }) => {
  const [formValues, user, err, loading] = useLogin();

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      // todo: use provider, set user and loggedIn
      setUser(user);
    }
  }, [user]);

  if (loggedIn) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <div className="ui container login-wrapper">
      <div className={`ui ${loading && "loading"} segment login-card`}>
        <form className="ui form" onSubmit={formValues.handleSubmit}>
          <img className="ui image" src={logo} alt="continuance-logo" />
          <Input
            name="username"
            placeholder="Username"
            type="text"
            formValues={formValues}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            formValues={formValues}
          />
          <button className="ui primary fluid large button login-button">
            Login
          </button>
        </form>
        {err && <div className="ui warning message">{err}</div>}
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { loggedIn } }) => {
  return {
    loggedIn
  };
};

export default connect(
  mapStateToProps,
  { setUser }
)(NewLogin);

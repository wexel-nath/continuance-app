import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { camelizeKeys as toCamelCase } from "humps";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../../img/continuance_logo.jpg";
import { login } from "../../api/authentication";
import { getHealth } from "../../api/continuance";
import { setJwt, setRefresh } from "../../util/storage";
import useForm from "../../components/helper/useForm";
import AuthContext from "../../context/AuthContext";
import {
  FormError,
  FormSubmit,
  Input
} from "../../components/helper/formHelpers";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${require(`../../img/continuance_cursed_background.jpg`)})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    marginTop: "30%",
    margin: theme.spacing(8, 4),
    top: "50%"
  }
}));

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://getwexel.com/">
        Wexel Tech
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

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
    // awaken continuance-server
    getHealth();

    setLoading(true);
    const {
      data: { result, message },
      statusText
    } = await login(username, password);
    setLoading(false);

    if (result) {
      const { jwt, refreshToken, user: userData } = toCamelCase(result);
      setJwt(jwt);
      setRefresh(refreshToken);
      setUser(userData);
    } else {
      setErr(message || statusText);
    }
  };

  const formValues = useForm(handleLogin, validate);
  return [formValues, user, err, loading];
};

const Login = () => {
  const classes = useStyles();
  const [formValues, user, err, loading] = useLogin();
  const {
    redirectPath,
    isAuthenticated,
    loading: backgroundSignInLoading,
    setLoggedIn
  } = useContext(AuthContext);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setLoggedIn(user);
    }
  }, [setLoggedIn, user]);

  const isLoading = loading || backgroundSignInLoading;

  if (isAuthenticated) {
    return <Redirect to={{ pathname: redirectPath }} />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Container>
            <img src={logo} alt="Continuance Logo" width="85%" />
          </Container>
          <form onSubmit={formValues.handleSubmit} noValidate>
            <Input
              formValues={formValues}
              label="Username"
              name="username"
              type="text"
              required
            />
            <Input
              formValues={formValues}
              label="Password"
              name="password"
              type="password"
              required
            />
            <FormSubmit loading={isLoading} text="Sign In" />
            <FormError error={err} />
          </form>
        </div>
        <Copyright />
      </Grid>
    </Grid>
  );
};

export default Login;

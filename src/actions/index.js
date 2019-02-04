import { login } from "../api/authentication";
import history from "../history";
import { LOG_IN, LOG_IN_FAIL, LOG_OUT, GOOGLE_SIGN_IN } from "./types";

export const handleLogIn = (username, password) => {
  // TODO: change to async action creator
  const response = login(username, password);
  if (response.hasOwnProperty("error")) {
    return {
      type: LOG_IN_FAIL,
      payload: response.error
    };
  }

  history.push("/");
  return {
    type: LOG_IN,
    payload: response.user
  };
};

export const handleGoogleSignIn = () => {
  // TODO: implement google sign in
  return {
    type: GOOGLE_SIGN_IN
  };
};

export const handleLogOut = () => {
  history.push("/login");
  return {
    type: LOG_OUT
  };
};

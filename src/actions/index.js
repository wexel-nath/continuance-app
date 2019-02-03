import { LOG_IN, LOG_OUT, GOOGLE_SIGN_IN } from "./types";

export const handleLogIn = (username, password) => {
  return {
    type: LOG_IN,
    payload: {
      username,
      password
    }
  };
};

export const handleGoogleSignIn = () => {
  // TODO: implement google sign in
  return {
    type: GOOGLE_SIGN_IN
  };
};

export const handleLogOut = () => {
  return {
    type: LOG_OUT
  };
};

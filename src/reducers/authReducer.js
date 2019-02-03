import { login } from "../api/authentication";
import { LOG_IN, LOG_OUT } from "../actions/types";

const INITIAL_STATE = {
  loggedIn: null,
  user: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
      const { username, password } = action.payload;
      const response = login(username, password);
      if (response.hasOwnProperty("error")) {
        return { ...state, error: response.error };
      }

      return { ...state, loggedIn: true, user: response.user, error: null };
    case LOG_OUT:
      return { ...state, loggedIn: false, user: null, error: null };
    default:
      return state;
  }
};

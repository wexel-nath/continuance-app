import { LOG_IN, LOG_IN_FAIL, LOG_OUT } from "../actions/types";

const INITIAL_STATE = {
  loggedIn: true,
  user: {
    username: "guest",
    first_name: "Guest"
  },
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN_FAIL:
      return { ...state, error: action.payload };
    case LOG_IN:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        error: null
      };
    case LOG_OUT:
      return { ...state, loggedIn: false, user: null, error: null };
    default:
      return state;
  }
};

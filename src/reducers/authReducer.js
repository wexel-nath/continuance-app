import { LOG_IN, LOG_IN_FAIL, LOG_OUT, LOG_IN_REQUEST } from "../actions/types";

const INITIAL_STATE = {
  loggedIn: false,
  loading: false,
  user: {},
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return { ...state, loading: true };
    case LOG_IN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOG_IN:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: action.payload,
        error: null
      };
    case LOG_OUT:
      return { ...state, loggedIn: false, user: null, error: null };
    default:
      return state;
  }
};

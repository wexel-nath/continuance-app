import { LOG_IN, LOG_IN_FAIL, LOG_OUT, LOG_IN_REQUEST } from "../actions/types";

const INITIAL_STATE = {
  loggedIn: true,
  isFetching: false,
  user: {},
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return { ...state, isFetching: true };
    case LOG_IN_FAIL:
      return { ...state, isFetching: false, error: action.payload };
    case LOG_IN:
      return {
        ...state,
        loggedIn: true,
        isFetching: false,
        user: action.payload,
        error: null
      };
    case LOG_OUT:
      return { ...state, loggedIn: false, user: null, error: null };
    default:
      return state;
  }
};

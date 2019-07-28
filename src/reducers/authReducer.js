import { LOG_IN, LOG_OUT } from "../actions/types";

const INITIAL_STATE = {
  loggedIn: false,
  loading: false,
  user: {},
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: action.payload,
        error: null
      };
    case LOG_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

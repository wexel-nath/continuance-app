import { LOG_IN, LOG_OUT } from "./types";

export const setUser = user => async dispatch => {
  dispatch({ type: LOG_IN, payload: user });
};

export const clearUser = () => async dispatch => {
  dispatch({ type: LOG_OUT });
};

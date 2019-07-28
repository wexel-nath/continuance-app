import { getCities } from "../api/cities";
import { LOG_IN, LOG_OUT, LOCATION_SEARCH } from "./types";

export const setUser = user => async dispatch => {
  dispatch({ type: LOG_IN, payload: user });
};

export const clearUser = () => async dispatch => {
  dispatch({ type: LOG_OUT });
};

export const handleLocationSearch = (name, address) => async dispatch => {
  const { data } = await getCities(address);

  if (data) {
    dispatch({
      type: LOCATION_SEARCH,
      payload: { name, result: data._embedded["city:search-results"] }
    });
  }
};

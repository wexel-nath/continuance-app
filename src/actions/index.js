import { camelizeKeys as toCamelCase } from "humps";

import { login, logout, getUser } from "../api/authentication";
import { getCities } from "../api/cities";
import {
  setJwt,
  setRefresh,
  getJwt,
  getRefresh,
  clearTokens
} from "../util/storage";
import { getCompanyList } from "../api/continuance";
import {
  LOG_IN_REQUEST,
  LOG_IN,
  LOG_IN_FAIL,
  LOG_OUT,
  LOCATION_SEARCH,
  GET_COMPANY_LIST
} from "./types";

export const handleLogin = ({ username, password }) => async dispatch => {
  dispatch({
    type: LOG_IN_REQUEST
  });

  const {
    data: { data, meta },
    statusText
  } = await login(username, password);

  if (data) {
    const { jwt, refreshToken, user } = toCamelCase(data);
    setJwt(jwt);
    setRefresh(refreshToken);

    dispatch({ type: LOG_IN, payload: user });
  } else {
    dispatch({
      type: LOG_IN_FAIL,
      payload: meta ? meta : statusText
    });
  }
};

export const handleGetUser = () => async dispatch => {
  if (!getJwt() || !getRefresh()) {
    clearTokens();
    return;
  }

  dispatch({
    type: LOG_IN_REQUEST
  });

  const {
    data: { data }
  } = await getUser();

  if (data) {
    const user = toCamelCase(data);
    dispatch({ type: LOG_IN, payload: user });
  } else {
    dispatch({
      type: LOG_IN_FAIL,
      payload: "Session timed out."
    });
  }
};

export const handleLogOut = () => async dispatch => {
  const refresh = getRefresh();
  await logout(refresh);
  clearTokens();
  dispatch({
    type: LOG_OUT
  });
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

export const handleGetCompanyList = () => async dispatch => {
  const {
    data: { data }
  } = await getCompanyList();

  if (data) {
    dispatch({
      type: GET_COMPANY_LIST,
      payload: toCamelCase(data)
    });
  }
};

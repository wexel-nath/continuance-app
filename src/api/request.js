import { camelizeKeys as toCamelCase } from "humps";

import {
  getJwt,
  getRefresh,
  setJwt,
  setRefresh,
  clearTokens
} from "../util/storage";
import { refresh } from "./authentication";

const getAuthHeader = () => {
  return "Bearer " + getJwt();
};

export const request = promise => {
  return promise.then(response => response).catch(error => error.response);
};

export const makeAuthRequest = async (axios, config) => {
  if (config.headers) {
    config.headers.Authorization = getAuthHeader();
  } else {
    config.headers = {
      Authorization: getAuthHeader()
    };
  }
  return await axios
    .request(config)
    .then(response => response)
    .catch(error => {
      const serverDownResponse = {
        data: { meta: "The server is temporarily unavailable." }
      };
      return error.response || serverDownResponse;
    });
};

export const requestWithAuth = async (axios, config) => {
  let response = await makeAuthRequest(axios, config);
  const { status } = response;

  if (status === 401 || status === 403) {
    const {
      data: { data }
    } = await refresh(getRefresh());
    if (data) {
      const { jwt, refreshToken } = toCamelCase(data);
      setJwt(jwt);
      setRefresh(refreshToken);

      return await makeAuthRequest(axios, config);
    } else {
      clearTokens();
      return {
        data: { meta: "Your session has expired." }
      };
    }
  }

  return response;
};

import { login } from "../api/authentication";
import cities from "../api/cities";
import history from "../history";
import { writeCookie } from "../util/cookie";
import { camelizeKeys as toCamelCase } from "humps";

import { getContactList } from "../api/continuance-server";
import {
  LOG_IN_REQUEST,
  LOG_IN,
  LOG_IN_FAIL,
  LOG_OUT,
  LOCATION_SEARCH,
  ADD_NEW_CONTACT,
  GET_CONTACT_LIST
} from "./types";

const COOKIE_EXPIRY = 60 * 60 * 4;

export const handleLogIn = ({ username, password }) => async dispatch => {
  dispatch({
    type: LOG_IN_REQUEST
  });
  return login(username, password)
    .then(response => {
      const { jwt_token, refresh_token, user } = response.data.result;
      writeCookie("JWT", jwt_token, COOKIE_EXPIRY);
      writeCookie("REFRESH", refresh_token, COOKIE_EXPIRY);
      dispatch({
        type: LOG_IN,
        payload: user
      });
    })
    .catch(error => {
      const { status, data, statusText } = error.response;
      dispatch({
        type: LOG_IN_FAIL,
        payload: status >= 500 ? statusText : data.messages[0]
      });
    });
};

export const handleLogOut = () => {
  return {
    type: LOG_OUT
  };
};

export const handleLocationSearch = (name, address) => async dispatch => {
  const response = await cities.get("", { params: { search: address } });

  dispatch({
    type: LOCATION_SEARCH,
    payload: { name, result: response.data._embedded["city:search-results"] }
  });
};

export const handleAddNewContact = formValues => {
  const contact = formValues;
  if (contact.locationBased) {
    contact.locationBased = contact.locationBased.label;
  }
  if (contact.locationMet) {
    contact.locationMet = contact.locationMet.label;
  }
  if (contact.company === "new") {
    contact.company = contact.company_name;
  }

  console.log(contact);

  // TODO: hit continuance api
  history.push("/contacts");
  return {
    type: ADD_NEW_CONTACT,
    payload: contact
  };
};

export const handleGetContactList = (limit, offset) => async dispatch => {
  await getContactList(limit, offset).then(response => {
    dispatch({
      type: GET_CONTACT_LIST,
      payload: toCamelCase(response.data.result)
    });
  });
};

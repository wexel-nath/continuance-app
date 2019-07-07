import { login } from "../api/authentication";
import cities from "../api/cities";
import history from "../history";
import { writeCookie } from "../util/cookie";

import {
  LOG_IN_REQUEST,
  LOG_IN,
  LOG_IN_FAIL,
  LOG_OUT,
  LOCATION_SEARCH,
  ADD_NEW_CONTACT
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
  if (contact.location) {
    contact.location = contact.location.label;
  }
  if (contact.location_met) {
    contact.location_met = contact.location_met.label;
  }
  if (contact.company === "new") {
    contact.company = contact.company_name;
  }
  // TODO: hit continuance api
  history.push("/contacts");
  return {
    type: ADD_NEW_CONTACT,
    payload: contact
  };
};

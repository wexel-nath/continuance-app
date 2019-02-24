import { login } from "../api/authentication";
import cities from "../api/cities";
import history from "../history";

import {
  LOG_IN,
  LOG_IN_FAIL,
  LOG_OUT,
  GOOGLE_SIGN_IN,
  LOCATION_SEARCH,
  ADD_NEW_CONTACT
} from "./types";

export const handleLogIn = ({ username, password }) => async dispatch => {
  const response = await login(username, password);
  if (response.hasOwnProperty("error")) {
    dispatch({
      type: LOG_IN_FAIL,
      payload: response.error
    });
    return;
  }

  history.push("/");
  dispatch({
    type: LOG_IN,
    payload: response.user
  });
};

export const handleGoogleSignIn = () => {
  // TODO: implement google sign in
  return {
    type: GOOGLE_SIGN_IN
  };
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

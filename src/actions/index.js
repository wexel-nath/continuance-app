import {
  camelizeKeys as toCamelCase,
  decamelizeKeys as toSnakeCase
} from "humps";

import { login, logout, getUser } from "../api/authentication";
import { getCities } from "../api/cities";
import history from "../history";
import {
  setJwt,
  setRefresh,
  getJwt,
  getRefresh,
  clearTokens
} from "../util/storage";
import {
  getContactList,
  newContact,
  getCompanyList,
  searchContacts
} from "../api/continuance-server";
import {
  LOG_IN_REQUEST,
  LOG_IN,
  LOG_IN_FAIL,
  LOG_OUT,
  LOCATION_SEARCH,
  ADD_NEW_CONTACT,
  GET_CONTACT_LIST,
  GET_COMPANY_LIST,
  SEARCH_CONTACTS
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

export const handleAddNewContact = formValues => async dispatch => {
  let contact = formValues;
  if (contact.locationBased) {
    contact.locationBased = contact.locationBased.label;
  }
  if (contact.locationMet) {
    contact.locationMet = contact.locationMet.label;
  }

  contact.company =
    formValues.companySelector === "new"
      ? {
          companyName: formValues.companyName,
          companyWebsite: formValues.companyWebsite,
          companyExpertise: formValues.companyExpertise,
          companyDescription: formValues.companyDescription
        }
      : {
          companyId: parseInt(formValues.companySelector)
        };

  // todo: dispatch a loading state

  const {
    data: { data },
    status
  } = await newContact(toSnakeCase(contact));

  if (status === 201) {
    history.push("/contacts");
    dispatch({
      type: ADD_NEW_CONTACT,
      payload: toCamelCase(data)
    });
  }

  // todo: handle error case
};

export const handleGetContactList = (limit, offset) => async dispatch => {
  const {
    data: { data }
  } = await getContactList(limit, offset);

  if (data) {
    dispatch({
      type: GET_CONTACT_LIST,
      payload: toCamelCase(data)
    });
  }
};

export const handleSearchContacts = search => async dispatch => {
  const {
    data: { data }
  } = await searchContacts(search);

  if (data) {
    dispatch({
      type: SEARCH_CONTACTS,
      payload: toCamelCase(data)
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

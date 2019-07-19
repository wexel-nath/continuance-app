import {
  camelizeKeys as toCamelCase,
  decamelizeKeys as toSnakeCase
} from "humps";

import { login, refresh, logout } from "../api/authentication";
import cities from "../api/cities";
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
  getCompanyList
} from "../api/continuance-server";
import {
  LOG_IN_REQUEST,
  LOG_IN,
  LOG_IN_FAIL,
  LOG_OUT,
  LOCATION_SEARCH,
  ADD_NEW_CONTACT,
  GET_CONTACT_LIST,
  GET_COMPANY_LIST
} from "./types";

export const handleLogIn = ({ username, password }) => async dispatch => {
  dispatch({
    type: LOG_IN_REQUEST
  });
  return login(username, password)
    .then(response => {
      const { jwt, refreshToken, user } = toCamelCase(response.data.result);
      setJwt(jwt);
      setRefresh(refreshToken);

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

export const handleRefresh = () => async dispatch => {
  await refresh(getJwt(), getRefresh()).then(response => {
    const { jwt, refreshToken, user } = toCamelCase(response.data.result);
    setJwt(jwt);
    setRefresh(refreshToken);

    dispatch({
      type: LOG_IN,
      payload: user
    });
  });
};

export const handleLogOut = () => async dispatch => {
  dispatch({
    type: LOG_OUT
  });
  await logout(getJwt(), getRefresh()).then(() => {
    clearTokens();
  });
};

export const handleLocationSearch = (name, address) => async dispatch => {
  const response = await cities.get("", { params: { search: address } });

  dispatch({
    type: LOCATION_SEARCH,
    payload: { name, result: response.data._embedded["city:search-results"] }
  });
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

  await newContact(toSnakeCase(contact))
    .then(response => {
      if (response.status === 201) {
        history.push("/contacts");
        dispatch({
          type: ADD_NEW_CONTACT,
          payload: toCamelCase(response.data.result)
        });
      }
    })
    .catch(error => {
      console.log(error);
      // todo: display error to user
    });
};

export const handleGetContactList = (limit, offset) => async dispatch => {
  await getContactList(limit, offset).then(response => {
    dispatch({
      type: GET_CONTACT_LIST,
      payload: toCamelCase(response.data.result)
    });
  });
};

export const handleGetCompanyList = () => async dispatch => {
  await getCompanyList().then(response => {
    dispatch({
      type: GET_COMPANY_LIST,
      payload: toCamelCase(response.data.result)
    });
  });
};

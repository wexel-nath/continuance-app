import { ADD_NEW_CONTACT, GET_CONTACT_LIST } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_NEW_CONTACT:
      return { ...state, [payload.contactId]: payload };
    case GET_CONTACT_LIST:
      var contactsMap = {};
      for (const contact of payload) {
        contactsMap[contact.contactId] = contact;
      }
      return { ...state, ...contactsMap };
    default:
      return state;
  }
};

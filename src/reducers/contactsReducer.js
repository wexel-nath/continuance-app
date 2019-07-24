import { GET_CONTACT_LIST } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_CONTACT_LIST:
      var contactsMap = {};
      for (const contact of payload) {
        contactsMap[contact.contactId] = contact;
      }
      return contactsMap;
    default:
      return state;
  }
};

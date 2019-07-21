import { SEARCH_CONTACTS } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SEARCH_CONTACTS:
      return payload;
    default:
      return state;
  }
};

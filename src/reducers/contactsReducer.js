import { ADD_NEW_CONTACT } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_CONTACT:
      // TODO: replace phone with ID returned from api
      return { ...state, [action.payload.phone]: action.payload };
    default:
      return state;
  }
};

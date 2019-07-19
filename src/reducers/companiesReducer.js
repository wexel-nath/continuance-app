import { GET_COMPANY_LIST } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_COMPANY_LIST:
      return payload;
    default:
      return state;
  }
};

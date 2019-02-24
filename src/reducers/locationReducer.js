import { LOCATION_SEARCH } from "../actions/types";

const INITIAL_STATE = {
  location: [],
  location_met: []
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOCATION_SEARCH:
      return { ...state, [payload.name]: payload.result };
    default:
      return state;
  }
};

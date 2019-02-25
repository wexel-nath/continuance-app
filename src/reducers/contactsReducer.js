import { ADD_NEW_CONTACT } from "../actions/types";

const INITIAL_STATE = {
  "nathanw@benon.com": {
    firstName: "Nathan",
    lastName: "Welch",
    phone: "0418721903",
    email: "nathanw@benon.com",
    location: "Brisbane, Queensland, Australia",
    location_met: "Brisbane, Queensland, Australia",
    position: "Developer",
    company: "Jumbo Interactive"
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_CONTACT:
      // TODO: replace phone with ID returned from api
      return { ...state, [action.payload.email]: action.payload };
    default:
      return state;
  }
};

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import locationReducer from "./locationReducer";
import contactsReducer from "./contactsReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  location: locationReducer,
  contacts: contactsReducer
});

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import contactsReducer from "./contactsReducer";
import locationReducer from "./locationReducer";

export default combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
  form: formReducer,
  location: locationReducer
});

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import locationReducer from "./locationReducer";
import companiesReducer from "./companiesReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  location: locationReducer,
  companies: companiesReducer
});

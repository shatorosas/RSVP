import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import rsvpsReducer from "./rsvpsReducer";
import contactsReducer from "./contactsReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  rsvps: rsvpsReducer,
  contacts: contactsReducer
});

import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import rsvpsReducer from "./rsvpsReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  rsvps: rsvpsReducer
});

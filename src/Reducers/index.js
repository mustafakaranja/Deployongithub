import { combineReducers } from "redux";
import { reducer as formReduser } from "redux-form";
import AuthReducers from "./AuthReducers";
import StreamReducer from "./StreamReducer";

export default combineReducers({
  auth: AuthReducers,
  form: formReduser,
  streams: StreamReducer,
});

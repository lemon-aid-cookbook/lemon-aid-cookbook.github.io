import { authReducer } from "pages/SignIn/redux/reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  Auth: authReducer,
});

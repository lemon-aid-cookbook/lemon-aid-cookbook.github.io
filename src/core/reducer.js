import { authReducer } from "pages/SignIn/redux/reducer";
import { combineReducers } from "redux";
import { recipeReducer } from "pages/RecipeCreate/redux/reducer";
import { profileReducer } from "pages/Profile/redux/reducer";

export const rootReducer = combineReducers({
  Auth: authReducer,
  Recipe: recipeReducer,
  Profile: profileReducer,
});

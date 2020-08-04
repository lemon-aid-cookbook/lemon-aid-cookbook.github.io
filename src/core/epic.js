import { combineEpics } from "redux-observable";
import { authEpics } from "pages/SignIn/redux/epics";
import { recipeEpics } from "pages/RecipeCreate/redux/epics";

export const rootEpic = combineEpics(authEpics, recipeEpics);

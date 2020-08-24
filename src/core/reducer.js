import { connectRouter } from 'connected-react-router'
import { profileReducer } from 'pages/Profile/redux/reducer'
import { recipeReducer } from 'pages/RecipeCreate/redux/reducer'
import { authReducer } from 'pages/SignIn/redux/reducer'
import { combineReducers } from 'redux'
import { history } from 'ultis/functions'

export const rootReducer = combineReducers({
  Auth: authReducer,
  Recipe: recipeReducer,
  Profile: profileReducer,
  router: connectRouter(history)
})

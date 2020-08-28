import {
  DeleteRecipeSuccess,
  GetDetailRecipeSuccess,
  SearchRecipes,
  SearchRecipesFailed,
  SearchRecipesSuccess
} from './actions'

const initialState = {
  detailRecipe: null,
  searchResult: [],
  totalItems: 0,
  isLoadingSearch: false
}

export function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case GetDetailRecipeSuccess.type:
      return {
        ...state,
        detailRecipe: action.payload.post
      }
    case SearchRecipes.type:
      return {
        ...state,
        isLoadingSearch: true
      }
    case SearchRecipesFailed.type:
      return {
        ...state,
        isLoadingSearch: false
      }
    case SearchRecipesSuccess.type:
      return {
        ...state,
        searchResult: action.payload.posts,
        totalItems: action.payload.totalItems ? action.payload.totalItems : 0,
        isLoadingSearch: false
      }
    case DeleteRecipeSuccess.type:
      return {
        ...state,
        detailRecipe: null
      }
    default:
      return state
  }
}

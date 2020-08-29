import {
  DeleteRecipeSuccess,
  GetDetailRecipeSuccess,
  SearchRecipes,
  SearchRecipesFailed,
  SearchRecipesSuccess,
  SearchLatestRecipesSuccess,
  SearchFavoriteRecipesSuccess,
  GetFollowingPostsSuccess
} from './actions'

const initialState = {
  detailRecipe: null,
  searchResult: [],
  favoriteRecipe: [],
  latestRecipe: [],
  followingPosts: [],
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
    case SearchLatestRecipesSuccess.type:
      return {
        ...state,
        latestRecipe: action.payload.posts
      }
    case GetFollowingPostsSuccess.type:
      return {
        ...state,
        followingPosts: action.payload.posts
      }
    case SearchFavoriteRecipesSuccess.type:
      return {
        ...state,
        favoriteRecipe: action.payload.posts
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
        totalItems: action.payload.numberOfPosts
          ? action.payload.numberOfPosts
          : 0,
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

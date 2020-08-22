import { defineAction } from "redux-typed-actions";

export const CreateRecipe = defineAction("CREATE_RECIPE");
export const CreateRecipeSuccess = defineAction("CREATE_RECIPE_SUCCESS");
export const CreateRecipeFailed = defineAction("CREATE_RECIPE_FAILED");

export const UpdateRecipe = defineAction("UPDATE_RECIPE");
export const UpdateRecipeSuccess = defineAction("UPDATE_RECIPE_SUCCESS");
export const UpdateRecipeFailed = defineAction("UPDATE_RECIPE_FAILED");

export const GetDetailRecipe = defineAction("GET_DETAIL_RECIPE");
export const GetDetailRecipeSuccess = defineAction("GET_DETAIL_RECIPE_SUCCESS");
export const GetDetailRecipeFailed = defineAction("GET_DETAIL_RECIPE_FAILED");

export const SearchRecipes = defineAction("SEARCH_RECIPES");
export const SearchRecipesSuccess = defineAction("SEARCH_RECIPES_SUCCESS");
export const SearchRecipesFailed = defineAction("SEARCH_RECIPES_FAILED");

export const LikePost = defineAction("LIKE_POST");
export const LikePostSuccess = defineAction("LIKE_POST_SUCCESS");
export const LikePostFailed = defineAction("LIKE_POST_FAILED");

export const UnlikePost = defineAction("UNLIKE_POST");
export const UnlikePostSuccess = defineAction("UNLIKE_POST_SUCCESS");
export const UnlikePostFailed = defineAction("UNLIKE_POST_FAILED");

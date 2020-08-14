import { defineAction } from "redux-typed-actions";

export const CreateRecipe = defineAction("CREATE_RECIPE");
export const CreateRecipeSuccess = defineAction("CREATE_RECIPE_SUCCESS");
export const CreateRecipeFailed = defineAction("CREATE_RECIPE_FAILED");

export const GetDetailRecipe = defineAction("GET_DETAIL_RECIPE");
export const GetDetailRecipeSuccess = defineAction("GET_DETAIL_RECIPE_SUCCESS");
export const GetDetailRecipeFailed = defineAction("GET_DETAIL_RECIPE_FAILED");

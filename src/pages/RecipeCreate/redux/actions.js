import { defineAction } from "redux-typed-actions";

export const CreateRecipe = defineAction("CREATE_RECIPE");
export const CreateRecipeSuccess = defineAction("CREATE_RECIPE_SUCCESS");
export const CreateRecipeFailed = defineAction("CREATE_RECIPE_FAILED");

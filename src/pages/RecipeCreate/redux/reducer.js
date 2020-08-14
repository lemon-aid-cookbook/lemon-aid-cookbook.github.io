import {
  GetDetailRecipeSuccess,
  GetDetailRecipe,
  GetDetailRecipeFailed,
} from "./actions";

const initialState = {
  detailRecipe: null,
  isLoadingDetail: false,
};

export function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case GetDetailRecipe.type:
      return {
        ...state,
        isLoadingDetail: true,
      };
    case GetDetailRecipeSuccess.type:
      return {
        ...state,
        detailRecipe: action.payload.post,
        isLoadingDetail: false,
      };
    case GetDetailRecipeFailed.type:
      return {
        ...state,
        isLoadingDetail: false,
      };
    default:
      return state;
  }
}

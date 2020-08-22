import { GetDetailRecipeSuccess } from "./actions";

const initialState = {
  detailRecipe: null,
  searchResult: [],
};

export function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case GetDetailRecipeSuccess.type:
      return {
        ...state,
        detailRecipe: action.payload.post,
      };
    default:
      return state;
  }
}

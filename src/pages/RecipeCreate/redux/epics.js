import { combineEpics, ofType } from "redux-observable";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { request } from "ultis/api";
import {
  CreateRecipe,
  CreateRecipeFailed,
  CreateRecipeSuccess,
} from "./actions";

const createRecipeEpic$ = (action$) =>
  action$.pipe(
    ofType(CreateRecipe.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "post/create",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return CreateRecipeSuccess.get(result.data);
          }
          return CreateRecipeFailed.get(result);
        }),
        catchError((error) => {
          return CreateRecipeFailed.get(error);
        })
      );
    })
  );

export const recipeEpics = combineEpics(createRecipeEpic$);

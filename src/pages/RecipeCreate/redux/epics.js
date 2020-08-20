import { store } from "core/store";
import { combineEpics, ofType } from "redux-observable";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { request } from "ultis/api";
import {
  CreateRecipe,
  CreateRecipeFailed,
  CreateRecipeSuccess,
  GetDetailRecipe,
  GetDetailRecipeFailed,
  GetDetailRecipeSuccess,
  LikePost,
  LikePostFailed,
  LikePostSuccess,
  UnlikePost,
  UnlikePostFailed,
  UnlikePostSuccess,
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

const getDetailRecipeEpic$ = (action$) =>
  action$.pipe(
    ofType(GetDetailRecipe.type),
    exhaustMap((action) => {
      return request({
        method: "GET",
        url: `post/getPost/${action.payload.postId}`,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetDetailRecipeSuccess.get(result.data);
          }
          return GetDetailRecipeFailed.get(result);
        }),
        catchError((error) => {
          return GetDetailRecipeFailed.get(error);
        })
      );
    })
  );

const likePostEpic$ = (action$) =>
  action$.pipe(
    ofType(LikePost.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "user/likepost",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(
              GetDetailRecipe.get({ postId: action.payload.postId })
            );
            return LikePostSuccess.get(result.data);
          }
          return LikePostFailed.get(result);
        }),
        catchError((error) => {
          return LikePostFailed.get(error);
        })
      );
    })
  );

const unlikePostEpic$ = (action$) =>
  action$.pipe(
    ofType(UnlikePost.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "user/unlikepost",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(
              GetDetailRecipe.get({ postId: action.payload.postId })
            );
            return UnlikePostSuccess.get(result.data);
          }
          return UnlikePostFailed.get(result);
        }),
        catchError((error) => {
          return UnlikePostFailed.get(error);
        })
      );
    })
  );

export const recipeEpics = combineEpics(
  createRecipeEpic$,
  getDetailRecipeEpic$,
  likePostEpic$,
  unlikePostEpic$
);

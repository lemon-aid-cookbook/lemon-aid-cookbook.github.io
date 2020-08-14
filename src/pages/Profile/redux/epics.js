import { combineEpics, ofType } from "redux-observable";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { request } from "ultis/api";
import {
  GetProfilePost,
  GetProfilePostFailed,
  GetProfilePostSuccess,
} from "./actions";

const getProfilePostEpic$ = (action$) =>
  action$.pipe(
    ofType(GetProfilePost.type),
    exhaustMap((action) => {
      return request({
        method: "GET",
        url: "post/getPostsByTabs",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetProfilePostSuccess.get(result.data);
          }
          return GetProfilePostFailed.get(result);
        }),
        catchError((error) => {
          return GetProfilePostFailed.get(error);
        })
      );
    })
  );

export const profileEpics = combineEpics(getProfilePostEpic$);

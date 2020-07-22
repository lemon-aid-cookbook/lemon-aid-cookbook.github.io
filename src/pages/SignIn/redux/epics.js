import { combineEpics, ofType } from "redux-observable";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { request } from "ultis/api";
import {
  SignInRequestFailed,
  SignInRequest,
  SignInRequestSuccess,
} from "./actions";

const signinEpic$ = (action$) =>
  action$.pipe(
    ofType(SignInRequest.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "signin",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return SignInRequestSuccess.get(result.data);
          }
          return SignInRequestFailed.get(result);
        }),
        catchError((error) => {
          return SignInRequestFailed.get(error);
        })
      );
    })
  );

export const authEpics = combineEpics(signinEpic$);

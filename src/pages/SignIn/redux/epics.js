import { combineEpics, ofType } from "redux-observable";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { request } from "ultis/api";
import {
  SignInRequestFailed,
  SignInRequest,
  SignInRequestSuccess,
  SignUpRequest,
  SignUpRequestSuccess,
  SignUpRequestFailed,
  ResetPassword,
  ResetPasswordSuccess,
  ResetPasswordFailed,
} from "./actions";
import { GlobalModalSetup } from "components/GlobalModal";
import { history } from "ultis/functions";

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
            history.back();
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

const signupEpic$ = (action$) =>
  action$.pipe(
    ofType(SignUpRequest.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "signup",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return SignUpRequestSuccess.get(result.data);
          }
          return SignUpRequestFailed.get(result);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            "Thông báo",
            error.data?.message
          );
          return SignUpRequestFailed.get(error);
        })
      );
    })
  );

const resetPasswordEpic$ = (action$) =>
  action$.pipe(
    ofType(ResetPassword.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "reset-password",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return ResetPasswordSuccess.get(result.data);
          }
          return ResetPasswordFailed.get(result);
        }),
        catchError((error) => {
          return ResetPasswordFailed.get(error);
        })
      );
    })
  );

export const authEpics = combineEpics(
  signinEpic$,
  signupEpic$,
  resetPasswordEpic$
);

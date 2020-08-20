import { GlobalModalSetup } from "components/GlobalModal";
import { GetProfile } from "pages/Profile/redux/actions";
import { combineEpics, ofType } from "redux-observable";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { request } from "ultis/api";
import { history } from "ultis/functions";
import {
  ResetPassword,
  ResetPasswordFailed,
  ResetPasswordSuccess,
  SignInRequest,
  SignInRequestFailed,
  SignInRequestSuccess,
  SignUpRequest,
  SignUpRequestFailed,
  SignUpRequestSuccess,
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

const signinSuccessEpic$ = (action$) =>
  action$.pipe(
    ofType(SignInRequestSuccess.type),
    map((action) => GetProfile.get(action.payload.user))
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
  resetPasswordEpic$,
  signinSuccessEpic$
);

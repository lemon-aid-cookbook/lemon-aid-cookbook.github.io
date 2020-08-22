import { store } from "core/store";
import { combineEpics, ofType } from "redux-observable";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { request } from "ultis/api";
import {
  Follow,
  FollowFailed,
  FollowSuccess,
  GetProfile,
  GetProfileFailed,
  GetProfilePost,
  GetProfilePostFailed,
  GetProfilePostSuccess,
  GetProfileSuccess,
  Unfollow,
  UnfollowFailed,
  UnfollowSuccess,
  UpdateInformation,
  UpdateInformationFailed,
  UpdateInformationSuccess,
} from "./actions";
import { TAB_TYPES } from "../constants";
import { LIMIT_ITEMS } from "ultis/functions";

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

const updateInformationEpic$ = (action$) =>
  action$.pipe(
    ofType(UpdateInformation.type),
    exhaustMap((action) => {
      return request({
        method: "PUT",
        url: `user/update/${action.payload.userId}`,
        param: action.payload.data,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user));
            return UpdateInformationSuccess.get(result.data);
          }
          return UpdateInformationFailed.get(result);
        }),
        catchError((error) => {
          return UpdateInformationFailed.get(error);
        })
      );
    })
  );

const getProfileEpic$ = (action$) =>
  action$.pipe(
    ofType(GetProfile.type),
    exhaustMap((action) => {
      return request({
        method: "GET",
        url: `user/${action.payload.username}`,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(
              GetProfilePost.get({
                userId: action.payload.id,
                limit: LIMIT_ITEMS,
                page: store.getState().Profile.page,
                type: TAB_TYPES[store.getState().Profile.tab],
              })
            );
            return GetProfileSuccess.get(result.data);
          }
          return GetProfileFailed.get(result);
        }),
        catchError((error) => {
          return GetProfileFailed.get(error);
        })
      );
    })
  );

const followEpic$ = (action$) =>
  action$.pipe(
    ofType(Follow.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "user/follow",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user));
            return FollowSuccess.get(result.data);
          }
          return FollowFailed.get(result);
        }),
        catchError((error) => {
          return FollowFailed.get(error);
        })
      );
    })
  );

const unfollowEpic$ = (action$) =>
  action$.pipe(
    ofType(Unfollow.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "user/unfollow",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user));
            return UnfollowSuccess.get(result.data);
          }
          return UnfollowFailed.get(result);
        }),
        catchError((error) => {
          return UnfollowFailed.get(error);
        })
      );
    })
  );

export const profileEpics = combineEpics(
  getProfilePostEpic$,
  updateInformationEpic$,
  getProfileEpic$,
  followEpic$,
  unfollowEpic$
);

import { GlobalModalSetup } from 'components/GlobalModal'
import { store } from 'core/store'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { history, LIMIT_ITEMS, MODAL_TYPE } from 'ultis/functions'
import { TAB_TYPES } from '../constants'
import {
  Follow,
  FollowFailed,
  FollowSuccess,
  GetAnotherProfile,
  GetAnotherProfileFailed,
  GetAnotherProfileSuccess,
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
  UpdateInformationSuccess
} from './actions'

const getProfilePostEpic$ = action$ =>
  action$.pipe(
    ofType(GetProfilePost.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'post/getPostsByTabs',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetProfilePostSuccess.get(result.data)
          }
          return GetProfilePostFailed.get(result)
        }),
        catchError(error => {
          return GetProfilePostFailed.get(error)
        })
      )
    })
  )

const updateInformationEpic$ = action$ =>
  action$.pipe(
    ofType(UpdateInformation.type),
    exhaustMap(action => {
      return request({
        method: 'PUT',
        url: `user/update/${action.payload.userId}`,
        param: action.payload.data
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetAnotherProfile.get(store.getState().Auth.user.username)
            )
            return UpdateInformationSuccess.get(result.data)
          }
          return UpdateInformationFailed.get(result)
        }),
        catchError(error => {
          return UpdateInformationFailed.get(error)
        })
      )
    })
  )

const getProfileEpic$ = action$ =>
  action$.pipe(
    ofType(GetProfile.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `user/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            if (store.getState().Profile.profileDetail) {
              store.dispatch(
                GetAnotherProfile.get(
                  store.getState().Profile.profileDetail.username
                )
              )
            }
            return GetProfileSuccess.get(result.data)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            result.data?.error,
            MODAL_TYPE.NORMAL,
            () => history.replace('/')
          )
          return GetProfileFailed.get(result)
        }),
        catchError(error => {
          return GetProfileFailed.get(error)
        })
      )
    })
  )

const getAnotherProfileEpic$ = action$ =>
  action$.pipe(
    ofType(GetAnotherProfile.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `user/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetProfilePost.get({
                userId: result.data.userData.id,
                limit: LIMIT_ITEMS,
                page: store.getState().Profile.page,
                type: TAB_TYPES[store.getState().Profile.tab]
              })
            )
            return GetAnotherProfileSuccess.get(result.data)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            result.data?.error,
            MODAL_TYPE.NORMAL,
            () => history.replace('/')
          )
          return GetAnotherProfileFailed.get(result)
        }),
        catchError(error => {
          return GetAnotherProfileFailed.get(error)
        })
      )
    })
  )

const followEpic$ = action$ =>
  action$.pipe(
    ofType(Follow.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'user/follow',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user.username))
            return FollowSuccess.get(result.data)
          }
          return FollowFailed.get(result)
        }),
        catchError(error => {
          return FollowFailed.get(error)
        })
      )
    })
  )

const unfollowEpic$ = action$ =>
  action$.pipe(
    ofType(Unfollow.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'user/unfollow',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user.username))
            return UnfollowSuccess.get(result.data)
          }
          return UnfollowFailed.get(result)
        }),
        catchError(error => {
          return UnfollowFailed.get(error)
        })
      )
    })
  )

export const profileEpics = combineEpics(
  getProfilePostEpic$,
  updateInformationEpic$,
  getProfileEpic$,
  followEpic$,
  unfollowEpic$,
  getAnotherProfileEpic$
)

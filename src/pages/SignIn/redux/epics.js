import { GlobalModalSetup } from 'components/GlobalModal'
import { replace } from 'connected-react-router'
import { store } from 'core/store'
import { GetProfile } from 'pages/Profile/redux/actions'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import {
  ResetPassword,
  ResetPasswordFailed,
  ResetPasswordSuccess,
  SignInRequest,
  SignInRequestFailed,
  SignInRequestSuccess,
  SignUpRequest,
  SignUpRequestFailed,
  SignUpRequestSuccess
} from './actions'

const signinEpic$ = action$ =>
  action$.pipe(
    ofType(SignInRequest.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'signin',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return SignInRequestSuccess.get(result.data)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            result.data?.err
          )
          return SignInRequestFailed.get(result.data.err)
        }),
        catchError(error => {
          return SignInRequestFailed.get(error)
        })
      )
    })
  )

const signinSuccessEpic$ = action$ =>
  action$.pipe(
    ofType(SignInRequestSuccess.type),
    map(action => GetProfile.get(action.payload.user.username))
  )

const signupEpic$ = action$ =>
  action$.pipe(
    ofType(SignUpRequest.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'signup',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(replace('/signin', { from: '/signup' }))
            GlobalModalSetup.getGlobalModalHolder().alertMessage(
              'Thông báo',
              result.data.message
            )
            return SignUpRequestSuccess.get(result.data)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            result.data?.message
          )
          return SignUpRequestFailed.get(result)
        }),
        catchError(error => {
          return SignUpRequestFailed.get(error)
        })
      )
    })
  )

const resetPasswordEpic$ = action$ =>
  action$.pipe(
    ofType(ResetPassword.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'reset-password',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModalSetup.getGlobalModalHolder().alertMessage(
              'Thông báo',
              'Vui lòng kiểm tra email để thay đổi mật khẩu'
            )
            return ResetPasswordSuccess.get(result.data)
          }
          return ResetPasswordFailed.get(result)
        }),
        catchError(error => {
          return ResetPasswordFailed.get(error)
        })
      )
    })
  )

export const authEpics = combineEpics(
  signinEpic$,
  signupEpic$,
  resetPasswordEpic$,
  signinSuccessEpic$
)

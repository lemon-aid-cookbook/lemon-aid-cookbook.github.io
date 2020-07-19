import { defineAction } from 'redux-typed-actions'

export const SignInRequest = defineAction('SIGNIN_REQUEST')
export const SignInRequestSuccess = defineAction('SIGNIN_REQUEST_SUCCESS')
export const SignInRequestFailed = defineAction('SIGNIN_REQUEST_FAILED')

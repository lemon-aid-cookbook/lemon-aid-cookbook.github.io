import { defineAction } from 'redux-typed-actions'

export const GetProfilePost = defineAction('GET_PROFILE_POST')
export const GetProfilePostSuccess = defineAction('GET_PROFILE_POST_SUCCESS')
export const GetProfilePostFailed = defineAction('GET_PROFILE_POST_FAILED')

export const UpdateInformation = defineAction('UPDATE_INFORMATION')
export const UpdateInformationSuccess = defineAction(
  'UPDATE_INFORMATION_SUCCESS'
)
export const UpdateInformationFailed = defineAction('UPDATE_INFORMATION_FAILED')

export const GetProfile = defineAction('GET_PROFILE')
export const GetProfileSuccess = defineAction('GET_PROFILE_SUCCESS')
export const GetProfileFailed = defineAction('GET_PROFILE_FAILED')

export const GetAnotherProfile = defineAction('GET_ANOTHER_PROFILE')
export const GetAnotherProfileSuccess = defineAction(
  'GET_ANOTHER_PROFILE_SUCCESS'
)
export const GetAnotherProfileFailed = defineAction(
  'GET_ANOTHER_PROFILE_FAILED'
)

export const Follow = defineAction('FOLLOW')
export const FollowSuccess = defineAction('FOLLOW_SUCCESS')
export const FollowFailed = defineAction('FOLLOW_FAILED')

export const Unfollow = defineAction('UNFOLLOW')
export const UnfollowSuccess = defineAction('UNFOLLOW_SUCCESS')
export const UnfollowFailed = defineAction('UNFOLLOW_FAILED')

export const ChangePassword = defineAction('CHANGE_PASSWORD')
export const ChangePasswordSuccess = defineAction('CHANGE_PASSWORD_SUCCESS')
export const ChangePasswordFailed = defineAction('CHANGE_PASSWORD_FAILED')

export const GetTopUser = defineAction('GET_TOP_USER')
export const GetTopUserSuccess = defineAction('GET_TOP_USER_SUCCESS')
export const GetTopUserFailed = defineAction('GET_TOP_USER_FAILED')

export const SetProfileTab = defineAction('SET_PROFILE_TAB')

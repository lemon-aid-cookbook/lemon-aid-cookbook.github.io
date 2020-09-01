import { SignOut } from 'pages/SignIn/redux/actions'
import {
  GetAnotherProfileSuccess,
  GetProfilePost,
  GetProfilePostFailed,
  GetProfilePostSuccess,
  GetProfileSuccess,
  GetTopUserSuccess,
  SetProfileTab,
  UpdateInformation,
  UpdateInformationFailed,
  UpdateInformationSuccess
} from './actions'

const initialState = {
  tabPosts: [],
  totalItems: 0,
  tab: 0,
  page: 1,
  userDetail: null,
  isLoadingRecipe: false,
  isLoadingAvatar: false,
  userFollowings: [],
  profileDetail: null,
  topUser: []
}

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GetProfileSuccess.type:
      return {
        ...state,
        userDetail: action.payload.userData,
        userFollowings: action.payload.userData.followings
      }
    case GetAnotherProfileSuccess.type:
      return {
        ...state,
        profileDetail: action.payload.userData
      }
    case GetProfilePost.type:
      return {
        ...state,
        isLoadingRecipe: true
      }
    case GetProfilePostSuccess.type:
      return {
        ...state,
        tabPosts: action.payload.posts,
        totalItems: action.payload.totalItems,
        isLoadingRecipe: false
      }
    case GetProfilePostFailed.type:
      return {
        ...state,
        isLoadingRecipe: false
      }
    case GetTopUserSuccess.type:
      return {
        ...state,
        topUser: action.payload.data
      }
    case UpdateInformation.type:
      return {
        ...state,
        isLoadingAvatar: true
      }
    case UpdateInformationFailed.type:
      return {
        ...state,
        isLoadingAvatar: false
      }
    case UpdateInformationSuccess.type:
      return {
        ...state,
        isLoadingAvatar: false
      }
    case SignOut.type:
      return {
        ...state,
        tabPosts: [],
        userDetail: null,
        totalItems: 0,
        tab: 0,
        page: 1,
        isLoadingRecipe: false,
        userFollowings: []
      }
    case SetProfileTab.type:
      return {
        ...state,
        tab: action.payload.tab,
        page: action.payload.page
      }
    default:
      return state
  }
}

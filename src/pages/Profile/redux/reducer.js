import { SignOut } from "pages/SignIn/redux/actions";
import {
  GetProfile,
  GetProfilePostFailed,
  GetProfilePostSuccess,
  GetProfileSuccess,
} from "./actions";

const initialState = {
  favoritePosts: [],
  myPosts: [],
  followingPosts: [],
  userDetail: null,
  isLoading: false,
};

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GetProfile.type:
      return {
        ...state,
        isLoading: true,
      };
    case GetProfileSuccess.type:
      return {
        ...state,
        userDetail: action.payload.userData,
      };
    case GetProfilePostSuccess.type:
      return {
        ...state,
        favoritePosts: action.payload.favoritePosts,
        myPosts: action.payload.myPosts,
        followingPosts: action.payload.followingPosts,
        isLoading: false,
      };
    case GetProfilePostFailed.type:
      return {
        ...state,
        isLoading: false,
      };
    case SignOut.type:
      return {
        favoritePosts: [],
        myPosts: [],
        followingPosts: [],
        userDetail: null,
        isLoading: false,
      };
    default:
      return state;
  }
}

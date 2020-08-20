import { SignOut } from "pages/SignIn/redux/actions";
import {
  GetProfile,
  GetProfilePostSuccess,
  GetProfileSuccess
} from "./actions";

const initialState = {
  favoritePosts: [],
  myPosts: [],
  followingPosts: [],
  userDetail: null,
};

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GetProfile.type:
      return {
        ...state,
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
      };
    case SignOut.type:
      return {
        favoritePosts: [],
        myPosts: [],
        followingPosts: [],
        userDetail: null,
      };
    default:
      return state;
  }
}

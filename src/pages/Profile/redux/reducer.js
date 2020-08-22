import { SignOut } from "pages/SignIn/redux/actions";
import {
  GetProfilePostSuccess,
  GetProfileSuccess,
  SetProfileTab,
  GetProfilePost,
  GetProfilePostFailed,
} from "./actions";

const initialState = {
  tabPosts: [],
  totalItems: 0,
  tab: 0,
  page: 1,
  userDetail: null,
  isLoadingRecipe: false,
};

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GetProfileSuccess.type:
      return {
        ...state,
        userDetail: action.payload.userData,
      };
    case GetProfilePost.type:
      return {
        ...state,
        isLoadingRecipe: true,
      };
    case GetProfilePostSuccess.type:
      return {
        ...state,
        tabPosts: action.payload.posts,
        totalItems: action.payload.totalItems,
        isLoadingRecipe: false,
      };
    case GetProfilePostFailed.type:
      return {
        ...state,
        isLoadingRecipe: false,
      };
    case SignOut.type:
      return {
        tabPosts: [],
        userDetail: null,
        totalItems: 0,
        tab: 0,
        page: 1,
        isLoadingRecipe: false,
      };
    case SetProfileTab.type:
      return {
        ...state,
        tab: action.payload.tab,
        page: action.payload.page,
      };
    default:
      return state;
  }
}

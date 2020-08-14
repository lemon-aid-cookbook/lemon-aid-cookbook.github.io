import {
  GetProfilePostSuccess,
  GetProfilePostFailed,
  GetProfilePost,
} from "./actions";

const initialState = {
  favoritePosts: [],
  myPosts: [],
  followingPosts: [],
  isLoading: false,
};

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GetProfilePost.type:
      return {
        ...state,
        isLoading: true,
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
    default:
      return state;
  }
}

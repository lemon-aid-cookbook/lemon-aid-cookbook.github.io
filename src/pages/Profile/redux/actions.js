import { defineAction } from "redux-typed-actions";

export const GetProfilePost = defineAction("GET_PROFILE_POST");
export const GetProfilePostSuccess = defineAction("GET_PROFILE_POST_SUCCESS");
export const GetProfilePostFailed = defineAction("GET_PROFILE_POST_FAILED");

export const UpdateInformation = defineAction("UPDATE_INFORMATION");
export const UpdateInformationSuccess = defineAction(
  "UPDATE_INFORMATION_SUCCESS"
);
export const UpdateInformationFailed = defineAction(
  "UPDATE_INFORMATION_FAILED"
);

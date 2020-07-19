import { SignInRequestSuccess } from "./actions";
const initialState = {
  jwt: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SignInRequestSuccess.type:
      return { ...state, jwt: action.payload };
    default:
      return state;
  }
}

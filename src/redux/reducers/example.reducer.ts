import { SIGNED_USER, SIGN_OUT } from "./constants";

const initialState = {
  username: localStorage.getItem("user") || "",
  loggedIn: localStorage.getItem("user") ? true : false,
};

export const example = (state = initialState, action: any) => {
  switch (action.type) {
    case SIGNED_USER:
      return { ...state, username: action.payload, loggedIn: true };
    case SIGN_OUT:
      return { username: "", loggedIn: false };
    default:
      return state;
  }
};

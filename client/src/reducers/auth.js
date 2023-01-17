import { SIGN_IN, SIGN_OUT } from "../actions/types";

export const authReducer = (
  signedUser = { isSigned: false, data: null },
  action
) => {
  switch (action.type) {
    case SIGN_IN:
      return { isSigned: true, data: action.payload };
    case SIGN_OUT:
      return { isSigned: false, data: null };
    default:
      return { ...signedUser };
  }
};

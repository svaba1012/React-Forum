import { GET_USER } from "../actions/types";

const userReducer = (user = null, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...action.payload };
    default:
      return { ...user };
  }
};

export { userReducer };

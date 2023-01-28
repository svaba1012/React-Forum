import {
  ADD_USER_OF_POSTS,
  EDIT_USER,
  GET_USER,
  GET_USERS_OF_POSTS,
} from "../actions/types";

const userReducer = (user = null, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...action.payload };
    case EDIT_USER:
      return { ...user, [action.payload.name]: action.payload.value };
    case GET_USERS_OF_POSTS:
      return { ...action.payload };
    case ADD_USER_OF_POSTS:
      if (!action.payload) {
        return { ...user };
      }
      return { ...user, [action.payload.sub]: action.payload };
    default:
      return { ...user };
  }
};

export { userReducer };

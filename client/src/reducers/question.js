import {
  GET_QUESTION,
  POST_QUESTION,
  VOTE_DOWN,
  VOTE_UP,
} from "../actions/types";

export const questionReducer = (question = null, action) => {
  switch (action.type) {
    case GET_QUESTION:
      return { ...action.payload };
    case POST_QUESTION:
      console.log(action.payload);
      return { ...action.payload };
    case VOTE_DOWN:
    case VOTE_UP:
      if (action.payload.postType >= 0) {
        return { ...question };
      }
      return { ...question, ...action.payload.data };
    default:
      return { ...question };
  }
};

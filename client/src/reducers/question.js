import { GET_QUESTION } from "../actions/types";

export const questionReducer = (question = null, action) => {
  switch (action.type) {
    case GET_QUESTION:
      return { ...action.payload };
    default:
      return { ...question };
  }
};

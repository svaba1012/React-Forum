import { GET_ANSWERS_FOR_QUESTION } from "../actions/types";

export const answersReducer = (answers = [], action) => {
  switch (action.type) {
    case GET_ANSWERS_FOR_QUESTION:
      return [...action.payload];
    default:
      return [...answers];
  }
};

import { GET_ANSWERS_FOR_QUESTION, VOTE_DOWN, VOTE_UP } from "../actions/types";

export const answersReducer = (answers = [], action) => {
  switch (action.type) {
    case GET_ANSWERS_FOR_QUESTION:
      return [...action.payload];
    case VOTE_DOWN:
    case VOTE_UP:
      if (action.payload.postType < 0) {
        return [...answers];
      }
      return [
        ...answers.map((answer, id) => {
          if (id === action.payload.postType) {
            return { ...answer, ...action.payload.data };
          }
          return { ...answer };
        }),
      ];
    default:
      return [...answers];
  }
};

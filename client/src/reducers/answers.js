import {
  DELETE_ANSWER,
  DELETE_ANSWERS_OF_QUESTION,
  EDIT_ANSWER,
  GET_ANSWERS_FOR_QUESTION,
  POST_ANSWER,
  VOTE_DOWN,
  VOTE_UP,
} from "../actions/types";

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
    case POST_ANSWER:
      // console.log();
      answers.push(action.payload);
      return [...answers];

    case EDIT_ANSWER:
      let temp = [
        ...answers.map((answer, id) => {
          if (id === action.payload.id) {
            return action.payload.data;
          }
          return answer;
        }),
      ];
      console.log(temp);
      return temp;
    case DELETE_ANSWER:
      return [...answers.filter((el, id) => id !== action.payload)];
    case DELETE_ANSWERS_OF_QUESTION:
      return [];
    default:
      return [...answers];
  }
};

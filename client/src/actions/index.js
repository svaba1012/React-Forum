import server from "../apis/server";
import {
  GET_ANSWERS_FOR_QUESTION,
  GET_QUESTION,
  SIGN_IN,
  SIGN_OUT,
  VOTE_DOWN,
  VOTE_UP,
} from "./types";

export const getQuestion = (id) => async (dispatch) => {
  let res = await server.get(`/questions/${id}`);
  dispatch({ type: GET_QUESTION, payload: res.data });
};

export const getAnswers = (questionId) => async (dispatch) => {
  let res = await server.get(`/answers`, {
    params: { questionId: questionId },
  });
  dispatch({ type: GET_ANSWERS_FOR_QUESTION, payload: res.data });
};

export const signIn = (obj) => {
  return { type: SIGN_IN, payload: obj };
};

export const signOut = () => {
  return { type: SIGN_OUT };
};

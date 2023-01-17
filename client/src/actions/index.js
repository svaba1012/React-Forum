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
  let resQue = await server.get(`/questions/${id}`);
  let resUser = await server.get(`/users/${resQue.data.userId}`);

  dispatch({
    type: GET_QUESTION,
    payload: { ...resQue.data, user: resUser.data },
  });
};

export const getAnswers = (questionId) => async (dispatch) => {
  let resQue = await server.get(`/answers`, {
    params: { questionId: questionId },
  });

  let res = await Promise.all(
    resQue.data.map(async (el) => {
      let resUser = await server.get(`/users/${el.userId}`);
      console.log({ ...el, user: resUser.data });
      return { ...el, user: resUser.data };
    })
  );

  dispatch({ type: GET_ANSWERS_FOR_QUESTION, payload: res });
};

export const signIn = (obj) => async (dispatch) => {
  console.log(obj);
  let res = await server.post(`/users/${obj.googleId}`);
  if (!res.profileObj) {
    let res = await server.post(`/users`, {
      ...obj.profileObj,
      id: obj.googleId,
    });
  }

  dispatch({ type: SIGN_IN, payload: obj });
};

export const signOut = () => {
  return { type: SIGN_OUT };
};

export const voteUp = (id) => async (dispatch, getState) => {
  // if id = -1 that is the current question
  // else it is id of answer
  let state = getState();
  let post = state.question;
  if (id >= 0) {
    post = state.answers[id];
  }
  let userId = state.auth.data.profileObj.googleId;
  let newVoteUps = post.voteUps;
  if (!newVoteUps.includes(userId)) {
    newVoteUps.push(userId);
  } else {
    newVoteUps = newVoteUps.filter((el) => el !== userId);
  }
  let newVoteDowns = post.voteDowns.filter((el) => el !== userId);
  let res;
  if (id >= 0) {
    res = await server.patch(`/answers/${post.id}`, {
      voteUps: newVoteUps,
      voteDowns: newVoteDowns,
    });
  } else {
    res = await server.patch(`/questions/${post.id}`, {
      voteUps: newVoteUps,
      voteDowns: newVoteDowns,
    });
  }

  dispatch({ type: VOTE_UP, payload: { data: res.data, postType: id } });
};

export const voteDown = (id) => async (dispatch, getState) => {
  // if id = -1 that is the current question
  // else it is id of answer
  let state = getState();
  let post = state.question;
  if (id >= 0) {
    post = state.answers[id];
  }
  let userId = state.auth.data.profileObj.googleId;
  let newVoteDowns = post.voteDowns;

  if (!newVoteDowns.includes(userId)) {
    newVoteDowns.push(userId);
  } else {
    newVoteDowns = newVoteDowns.filter((el) => el !== userId);
  }
  let newVoteUps = post.voteUps.filter((el) => el !== userId);

  let res;
  if (id >= 0) {
    res = await server.patch(`/answers/${post.id}`, {
      voteUps: newVoteUps,
      voteDowns: newVoteDowns,
    });
  } else {
    res = await server.patch(`/questions/${post.id}`, {
      voteUps: newVoteUps,
      voteDowns: newVoteDowns,
    });
  }

  dispatch({ type: VOTE_DOWN, payload: { data: res.data, postType: id } });
};

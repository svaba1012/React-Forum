import server from "../apis/server";
import {
  GET_ANSWERS_FOR_QUESTION,
  GET_QUESTION,
  SIGN_IN,
  SIGN_OUT,
  VOTE_DOWN,
  VOTE_UP,
  POST_QUESTION,
  EDIT_QUESTION,
  POST_ANSWER,
} from "./types";

export const getQuestion = (id) => async (dispatch) => {
  let resQue = await server.get(`/questions/${id}`);
  dispatch({
    type: GET_QUESTION,
    payload: { ...resQue.data },
  });
};

export const postQuestion =
  (question, navigate) => async (dispatch, getState) => {
    let state = getState();
    let userId = state.auth.data.profileObj.googleId;
    let resUser = await server.get(`/users/${userId}`);

    let res = await server.post(`/questions`, {
      title: question.title,
      description: question.description,
      voteUps: [],
      voteDowns: [],
      userId: userId,
      user: resUser.data,
    });

    dispatch({ type: POST_QUESTION, payload: res.data });
    navigate(`/questions/${res.data.id}`);
  };

export const editQuestion =
  (question, navigate) => async (dispatch, getState) => {
    let state = getState();
    // let userId = state.auth.data.profileObj.googleId;
    let id = state.question.id;
    await server.put(`/questions/${id}`, {
      ...state.question,
      title: question.title,
      description: question.description,
    });

    dispatch({ type: EDIT_QUESTION });
    navigate(`/questions/${id}`);
  };

export const getAnswers = (questionId) => async (dispatch) => {
  let res = await server.get(`/answers`, {
    params: { questionId: questionId },
  });

  dispatch({ type: GET_ANSWERS_FOR_QUESTION, payload: res.data });
};

export const postAnswer = (answer) => async (dispatch, getState) => {
  let state = getState();
  let userId = state.auth.data.profileObj.googleId;
  let resUser = await server.get(`/users/${userId}`);
  let questionId = state.question.id;

  let res = await server.post(`/answers`, {
    title: answer.title,
    description: answer.description,
    voteUps: [],
    voteDowns: [],
    questionId: questionId,
    userId: userId,
    user: resUser.data,
  });

  dispatch({ type: POST_ANSWER, payload: res.data });
};

export const editAnswer = (answer, answerId) => async (dispatch, getState) => {
  let state = getState();
  let answer = state.answers[answerId];

  await server.put(`/answers/${answer.id}`, {
    ...state.answers[answerId],
    title: answer.title,
    description: answer.description,
  });

  dispatch({ type: EDIT_QUESTION });
};

export const signIn = (obj) => async (dispatch) => {
  console.log(obj);
  let res = await server.get(`/users/${obj.googleId}`);
  if (!res.data.googleId) {
    await server.post(`/users`, {
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

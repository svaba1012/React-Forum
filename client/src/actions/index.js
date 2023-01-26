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
  EDIT_ANSWER,
  GET_USER,
  DELETE_ANSWER,
  DELETE_QUESTION,
  DELETE_ANSWERS_OF_QUESTION,
  GET_USERS_OF_POSTS,
  ADD_USER_OF_POSTS,
} from "./types";

export const getQuestion = (id) => async (dispatch) => {
  let res = await server.get(`/questions/${id}`);
  dispatch({
    type: GET_QUESTION,
    payload: { ...res.data },
  });
};

export const postQuestion =
  (question, navigate) => async (dispatch, getState) => {
    let state = getState();
    let userId = state.auth.data.sub;
    // let resUser = await server.get(`/users/${userId}`);

    let curDate = new Date();

    let res = await server.post(`/questions`, {
      title: question.title,
      description: question.description,
      voteUps: [],
      voteDowns: [],
      userId: userId,
      // user: resUser.data,
      date: curDate,
    });

    dispatch({ type: POST_QUESTION, payload: res.data });
    navigate(`/questions/${res.data.id}`);
  };

export const editQuestion =
  (question, navigate) => async (dispatch, getState) => {
    let state = getState();
    let id = state.question.id;
    await server.put(`/questions/${id}`, {
      ...state.question,
      title: question.title,
      description: question.description,
    });

    dispatch({ type: EDIT_QUESTION });
    navigate(`/questions/${id}`);
  };

export const deleteQuestion = (id) => async (dispatch) => {
  await server.delete(`/questions/${id}`);

  dispatch({
    type: DELETE_QUESTION,
    payload: id,
  });
};

export const getAnswers = (questionId) => async (dispatch) => {
  let res = await server.get(`/answers`, {
    params: { questionId: questionId },
  });

  dispatch({ type: GET_ANSWERS_FOR_QUESTION, payload: res.data });
};

export const postAnswer = (answer) => async (dispatch, getState) => {
  let state = getState();
  let userId = state.auth.data.sub;
  let questionId = state.question.id;

  let curDate = new Date();

  let res = await server.post(`/answers`, {
    title: answer.title,
    description: answer.description,
    voteUps: [],
    voteDowns: [],
    questionId: questionId,
    userId: userId,
    date: curDate,
  });

  dispatch({ type: POST_ANSWER, payload: res.data });
};

export const editAnswer = (answer, answerId) => async (dispatch, getState) => {
  await server.patch(`/answers/${answer.id}`, {
    ...answer,
  });

  dispatch({ type: EDIT_ANSWER, payload: { data: answer, id: answerId } });
};

export const deleteAnswer = (answerId, id) => async (dispatch) => {
  await server.delete(`/answers/${answerId}`);

  dispatch({ type: DELETE_ANSWER, payload: id });
};

export const deleteAnswersOfQuestion = (id) => async (dispatch) => {
  await server.get(`/answers`, {
    params: { questionId: id },
  });

  dispatch({ type: DELETE_ANSWERS_OF_QUESTION });
};

export const getUser = (userId) => async (dispatch) => {
  let res = await server.get(`/users/${userId}`);
  let resAns = await server.get(`/answers`, { params: { userId: userId } });
  let resQue = await server.get(`/questions`, { params: { userId: userId } });

  dispatch({
    type: GET_USER,
    payload: {
      ...res.data,
      questionCount: resQue.data.length,
      answerCount: resAns.data.length,
    },
  });
};

export const getUsersOfPosts = () => async (dispatch, getState) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  let { answers, question } = getState();
  let userIds = answers.map((el) => el.userId);
  userIds.push(question.userId);
  let uniqueUserIds = userIds.filter(onlyUnique);
  let res = await Promise.all(
    uniqueUserIds.map(async (userId) => {
      let r = await server.get(`/users/${userId}`);
      return r.data;
    })
  );

  let resObj = {};
  res.forEach((user) => {
    resObj[user.sub] = user;
  });

  dispatch({ type: GET_USERS_OF_POSTS, payload: resObj });
};

export const addUserOfPosts = () => async (dispatch, getState) => {
  let curUser = getState().auth.data;
  let users = getState().user;
  let res = null;
  if (!users[curUser.sub]) {
    res = curUser;
  }

  dispatch({ type: ADD_USER_OF_POSTS, payload: res });
};

export const signIn = (obj) => async (dispatch) => {
  try {
    await server.get(`/users/${obj.sub}`);
  } catch (error) {
    await server.post(`/users`, {
      ...obj,
      id: obj.sub,
      creationDate: new Date(),
      location: null,
      github: null,
      about: null,
      lastSeen: new Date(),
    });
  }

  dispatch({ type: SIGN_IN, payload: obj });
};

export const signOut = () => async (dispatch, getState) => {
  let user = getState().auth.data;
  await server.patch(`users/${user.id}`, { lastSeen: new Date() });
  dispatch({ type: SIGN_OUT });
};

export const voteUp = (id) => async (dispatch, getState) => {
  // if id = -1 that is the current question
  // else it is id of answer
  let state = getState();
  let post = state.question;
  if (id >= 0) {
    post = state.answers[id];
  }
  let userId = state.auth.data.sub;
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
  let userId = state.auth.data.sub;
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

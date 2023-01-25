import { combineReducers } from "redux";
import { reducer } from "redux-form";
import { questionReducer } from "./question";
import { authReducer } from "./auth";
import { answersReducer } from "./answers";
import { userReducer } from "./user";

export default combineReducers({
  question: questionReducer,
  answers: answersReducer,
  auth: authReducer,
  user: userReducer,
  form: reducer,
});

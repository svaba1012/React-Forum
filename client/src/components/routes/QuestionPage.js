import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PostBox from "../reusables/PostBox";
import PostForm from "../reusables/PostForm";
import {
  getQuestion,
  getAnswers,
  postAnswer,
  deleteAnswer,
  deleteAnswersOfQuestion,
  deleteQuestion,
  getUsersOfPosts,
  addUserOfPosts,
} from "../../actions";

function QuestionPage(props) {
  let { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    const func = async () => {
      await props.getQuestion(id);
      await props.getAnswers(id);
      await props.getUsersOfPosts();
    };
    func();
  }, []);
  let scroolRef = useRef();

  if (!props.question.title) {
    return;
  }
  return (
    <div>
      <h1>{props.question.title} </h1>
      <PostBox
        postData={props.question}
        id={-1}
        onDelete={() => {
          props.deleteAnswersOfQuestion(props.question.id);
          props.deleteQuestion(props.question.id);
          navigate("/questions");
        }}
      />
      <hr />

      <div className="ui segment" ref={scroolRef}>
        <h3>{props.answers.length} Answers</h3>
        {props.answers.map((answer, id) => {
          return (
            <PostBox
              postData={answer}
              key={id}
              id={id}
              onDelete={() => props.deleteAnswer(answer.id, id)}
            />
          );
        })}
      </div>
      <div className="ui segment">
        <h1>Answer this question</h1>
        <hr />
        <PostForm
          titleLabel={"Answer title"}
          contentLabel={"Answer description"}
          contentPlaceholder={"Describe in details your answer..."}
          titlePlaceholder={"Title of your answer..."}
          previewLabel={"Answer Preview"}
          submitText={"Post Answer"}
          onSubmit={(answer) => {
            props.postAnswer(answer);
            props.addUserOfPosts();
            scroolRef.current.scrollIntoView();
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { question: state.question, answers: state.answers };
};

export default connect(mapStateToProps, {
  getQuestion,
  getAnswers,
  postAnswer,
  deleteAnswer,
  deleteQuestion,
  deleteAnswersOfQuestion,
  getUsersOfPosts,
  addUserOfPosts,
})(QuestionPage);

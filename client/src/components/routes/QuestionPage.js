import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestion, getAnswers, postAnswer } from "../../actions";
import PostBox from "../reusables/PostBox";
import PostForm from "../reusables/PostForm";

function QuestionPage(props) {
  let { id } = useParams();
  useEffect(() => {
    props.getQuestion(id);
    props.getAnswers(id);
  }, []);

  if (!props.question.title) {
    return;
  }
  return (
    <div>
      <h1>{props.question.title} </h1>
      <PostBox postData={props.question} id={-1} />
      <div className="ui segment">
        <h3>{props.answers.length} Answers</h3>
        {props.answers.map((answer, id) => {
          return <PostBox postData={answer} key={id} id={id} />;
        })}
      </div>
      <div className="ui segment">
        <h1>Answer this question</h1>
        <PostForm
          titleLabel={"Answer title"}
          contentLabel={"Answer description"}
          contentPlaceholder={"Describe in details your answer..."}
          titlePlaceholder={"Title of your answer..."}
          previewLabel={"Answer Preview"}
          submitText={"Post Answer"}
          onSubmit={props.postAnswer}
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
})(QuestionPage);

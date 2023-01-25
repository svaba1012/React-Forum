import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../reusables/PostForm";
import { getQuestion, editQuestion } from "../../actions";

function QuestionEdit(props) {
  let { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    console.log(id);
    props.getQuestion(id);
  }, []);

  return (
    <PostForm
      initialValues={props.post}
      titleLabel={"Question title"}
      contentLabel={"Question description"}
      contentPlaceholder={"Describe in details your quetsion..."}
      titlePlaceholder={"Title of your question..."}
      previewLabel={"Question Preview"}
      submitText={"Edit Question"}
      onSubmit={(question) => props.editQuestion(question, navigate)}
    />
  );
}

const mapStateToProps = (state) => {
  return { post: state.question };
};

export default connect(mapStateToProps, { getQuestion, editQuestion })(
  QuestionEdit
);

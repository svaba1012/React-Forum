import React, { useEffect } from "react";
import PostForm from "../reusables/PostForm";
import { connect } from "react-redux";
import { getQuestion, editQuestion } from "../../actions";
import { useParams } from "react-router-dom";

function QuestionEdit(props) {
  let { id } = useParams();
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
      onSubmit={props.editQuestion}
    />
  );
}

const mapStateToProps = (state) => {
  return { post: state.question };
};

export default connect(mapStateToProps, { getQuestion, editQuestion })(
  QuestionEdit
);

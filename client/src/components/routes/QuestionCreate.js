import PostForm from "../reusables/PostForm";
import { connect } from "react-redux";
import { getQuestion, postQuestion } from "../../actions";

function QuestionCreate(props) {
  return (
    <PostForm
      titleLabel={"Question title"}
      contentLabel={"Question description"}
      contentPlaceholder={"Describe in details your quetsion..."}
      titlePlaceholder={"Title of your question..."}
      previewLabel={"Question Preview"}
      submitText={"Post Question"}
      onSubmit={props.postQuestion}
    />
  );
}

const mapStateToProps = (state) => {
  return { post: state.question };
};

export default connect(mapStateToProps, { getQuestion, postQuestion })(
  QuestionCreate
);

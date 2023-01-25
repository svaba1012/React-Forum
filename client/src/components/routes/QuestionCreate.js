import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostForm from "../reusables/PostForm";
import { getQuestion, postQuestion } from "../../actions";

function QuestionCreate(props) {
  let navigate = useNavigate();
  return (
    <div>
      <PostForm
        titleLabel={"Question title"}
        contentLabel={"Question description"}
        contentPlaceholder={"Describe in details your quetsion..."}
        titlePlaceholder={"Title of your question..."}
        previewLabel={"Question Preview"}
        submitText={"Post Question"}
        onSubmit={(answer) => {
          props.postQuestion(answer, navigate);
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { post: state.question };
};

export default connect(mapStateToProps, { getQuestion, postQuestion })(
  QuestionCreate
);

import PostForm from "../reusables/PostForm";
import { connect } from "react-redux";
import { editAnswer } from "../../actions";

function AnswerEdit(props) {
  return (
    <div>
      <h1>Edit this answer</h1>
      <hr />
      <PostForm
        initialValues={props.post}
        titleLabel={"Answer title"}
        contentLabel={"Answer description"}
        contentPlaceholder={"Describe in details your answer..."}
        titlePlaceholder={"Title of your answer..."}
        previewLabel={"Answer Preview"}
        submitText={"Edit Answer"}
        onSubmit={(answer) => {
          props.editAnswer(answer, props.answerId);
          props.afterSubmit();
        }}
      />
    </div>
  );
}

export default connect(null, { editAnswer })(AnswerEdit);

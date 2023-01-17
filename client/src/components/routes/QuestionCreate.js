import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

function QuestionCreate(props) {
  const renderInput = (formProps) => {
    console.log(formProps);
    console.log(props);
    return (
      <div className="ui segment">
        <h3>Question</h3>
        <div className="ui input">
          <input
            placeholder="Ask question..."
            onChange={formProps.input.onChange}
            value={formProps.input.value}
          />
        </div>
      </div>
    );
  };

  return (
    <form>
      <Field name="title" component={renderInput}></Field>
    </form>
  );
}

const FormQuestionCreate = reduxForm({
  form: "questionCreate",
})(QuestionCreate);

export default connect(null)(FormQuestionCreate);

import React, { useRef } from "react";
import { reduxForm, Field } from "redux-form";
import MarkupBox from "../reusables/MarkupBox";
import "./PostForm.css";

function PostForm(props) {
  let questionContentEl = useRef();

  const renderTitleInput = (formProps) => {
    return (
      <div className="ui segment">
        <h2>{props.titleLabel}</h2>
        <div className="ui input fluid">
          <input
            placeholder={props.titlePlaceholder} //"In short terms describe your question..."
            onChange={formProps.input.onChange}
            value={formProps.input.value}
          />
        </div>
      </div>
    );
  };

  const renderOptions = (formProps) => {
    const insertInline = (text) => {
      let cursorPos = questionContentEl.current.selectionStart;
      let contentVal = formProps.input.value;
      props.change(
        "description",
        contentVal.slice(0, cursorPos) + text + contentVal.slice(cursorPos)
      );
    };

    return (
      <div className="option-bar">
        <div>
          <i className="fa-solid fa-heading"></i>
        </div>
        <div onClick={() => insertInline(" **your text** ")}>
          <i className="fa-solid fa-bold"></i>
        </div>
        <div onClick={() => insertInline(" *your text* ")}>
          <i className="fa-solid fa-italic"></i>
        </div>
        <div onClick={() => insertInline(" `your text` ")}>
          <i className="fa-solid fa-code"></i>
        </div>
        <div>
          <i className="fa-solid fa-image"></i>
        </div>
        <div>
          <i className="fa-solid fa-quote-right"></i>
        </div>
        <div
          onClick={() =>
            insertInline(" [text](https://www.functionnotdeclared.com) ")
          }
        >
          <i className="fa-solid fa-link"></i>
        </div>
      </div>
    );
  };

  const renderContentInput = (formProps) => {
    const renderQuestionPreview = () => {
      return (
        <div className="ui segment">
          <h3>{props.previewLabel}</h3>
          <MarkupBox markup={formProps.input.value} />
        </div>
      );
    };

    return (
      <div className="ui segment">
        <h2>{props.contentLabel}</h2>
        {renderOptions(formProps)}
        <textarea
          ref={questionContentEl}
          className="text-area"
          rows={10}
          placeholder={props.contentPlaceholder}
          onChange={formProps.input.onChange}
          value={formProps.input.value}
        />
        {renderQuestionPreview()}
      </div>
    );
  };

  const onSubmit = (formValues) => {
    console.log(formValues);
    props.onSubmit(formValues);
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <Field name="title" component={renderTitleInput}></Field>
      <Field name="description" component={renderContentInput}></Field>
      <button className="ui button primary">{props.submitText}</button>
    </form>
  );
}

export default reduxForm({
  form: "postForm",
  enableReinitialize: true,
})(PostForm);

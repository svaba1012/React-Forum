import React, { useRef } from "react";
import { reduxForm, Field } from "redux-form";
import MarkupBox from "../reusables/MarkupBox";
import "./PostForm.css";

const renderTitleInput = (formProps) => {
  return (
    <div className="ui segment">
      <h2>{formProps.label}</h2>
      <div className="ui input fluid">
        <input
          placeholder={formProps.placeholder}
          onChange={formProps.input.onChange}
          value={formProps.input.value}
        />
      </div>
    </div>
  );
};

const renderContentInput = (formProps) => {
  const renderOptions = () => {
    const insertInline = async (text, endOffset) => {
      let cursorPos = formProps.questionContentEl.current.selectionStart;
      let contentVal = formProps.input.value;
      await formProps.change(
        "description",
        contentVal.slice(0, cursorPos) + text + contentVal.slice(cursorPos)
      );
      cursorPos = formProps.questionContentEl.current.selectionStart;

      formProps.questionContentEl.current.focus();
      formProps.questionContentEl.current.setSelectionRange(
        cursorPos - endOffset - 9,
        cursorPos - endOffset
      );
    };

    const insertBlock = async (text, endOffset) => {
      let cursorPos = formProps.questionContentEl.current.selectionStart;
      let contentVal = formProps.input.value;
      await formProps.change(
        "description",
        contentVal.slice(0, cursorPos) +
          "\n" +
          text +
          contentVal.slice(cursorPos)
      );
      cursorPos = formProps.questionContentEl.current.selectionStart;

      formProps.questionContentEl.current.focus();
      formProps.questionContentEl.current.setSelectionRange(
        cursorPos - endOffset - 9,
        cursorPos - endOffset
      );
    };

    return (
      <div className="option-bar">
        <div onClick={() => insertBlock("#your text", 0)}>
          <i className="fa-solid fa-heading"></i>
        </div>
        <div onClick={() => insertInline("**your text**", 2)}>
          <i className="fa-solid fa-bold"></i>
        </div>
        <div onClick={() => insertInline("*your text*", 1)}>
          <i className="fa-solid fa-italic"></i>
        </div>
        <div onClick={() => insertInline("`your text`", 1)}>
          <i className="fa-solid fa-code"></i>
        </div>
        <div onClick={() => insertBlock("```\nyour text\n```", 4)}>
          <i className="fa-solid fa-file-code"></i>
        </div>
        <div>
          <i className="fa-solid fa-image"></i>
        </div>
        <div onClick={() => insertBlock(">your text", 0)}>
          <i className="fa-solid fa-quote-right"></i>
        </div>
        <div
          onClick={() =>
            insertInline("[your text](https://www.functionnotdeclared.com)", 38)
          }
        >
          <i className="fa-solid fa-link"></i>
        </div>
      </div>
    );
  };

  const renderQuestionPreview = () => {
    return (
      <div className="ui segment">
        <h3>{formProps.previewLabel}</h3>
        <MarkupBox markup={formProps.input.value} />
      </div>
    );
  };

  return (
    <div className="ui segment">
      <h2>{formProps.contentLabel}</h2>
      {renderOptions(formProps)}
      <textarea
        ref={formProps.questionContentEl}
        className="text-area"
        rows={10}
        placeholder={formProps.contentPlaceholder}
        onChange={formProps.input.onChange}
        value={formProps.input.value}
      />
      {renderQuestionPreview()}
    </div>
  );
};

function PostForm(props) {
  let questionContentEl = useRef();

  const onSubmit = (formValues) => {
    console.log(formValues);
    props.onSubmit(formValues);
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <Field
        name="title"
        component={renderTitleInput}
        label={props.titleLabel}
        placeholder={props.titlePlaceholder}
      ></Field>
      <Field
        name="description"
        component={renderContentInput}
        questionContentEl={questionContentEl}
        change={props.change}
        contentLabel={props.contentLabel}
        contentPlaceholder={props.contentPlaceholder}
        previewLabel={props.previewLabel}
      ></Field>
      <button className="ui button primary">{props.submitText}</button>
    </form>
  );
}

export default reduxForm({
  form: "postForm",
  enableReinitialize: true,
})(PostForm);

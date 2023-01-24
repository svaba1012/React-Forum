import React, { useRef } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import MarkupBox from "../reusables/MarkupBox";
import "./PostForm.css";

const renderError = (error, touched) => {
  if (error && touched) {
    return (
      <h3>
        <span style={{ color: "red", fontSize: "large" }}>*</span>
        {error}
      </h3>
    );
  }
};
const renderTitleInput = (formProps) => {
  let styleClass = "ui input fluid ";
  if (formProps.meta.error && formProps.meta.touched) {
    styleClass += "error";
  }
  return (
    <div className="field">
      <h2>{formProps.label}</h2>
      {renderError(formProps.meta.error, formProps.meta.touched)}
      <div className={styleClass}>
        <input placeholder={formProps.placeholder} {...formProps.input} />
      </div>
    </div>
  );
};

const renderContentInput = (formProps) => {
  let styleClass = "";
  if (formProps.meta.error && formProps.meta.touched) {
    styleClass += "my-error";
  }

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
      <div className={"option-bar " + styleClass}>
        <div onClick={() => insertBlock("#your text", 0)} title="Heading">
          <i className="fa-solid fa-heading"></i>
        </div>
        <div onClick={() => insertInline("**your text**", 2)} title="Bold">
          <i className="fa-solid fa-bold"></i>
        </div>
        <div onClick={() => insertInline("*your text*", 1)} title="Italic">
          <i className="fa-solid fa-italic"></i>
        </div>
        <div onClick={() => insertInline("`your text`", 1)} title="Code">
          <i className="fa-solid fa-code"></i>
        </div>
        <div
          onClick={() => insertBlock("```\nyour text\n```", 4)}
          title="Block Code"
        >
          <i className="fa-solid fa-file-code"></i>
        </div>
        <div title="Image">
          <i className="fa-solid fa-image"></i>
        </div>
        <div onClick={() => insertBlock(">your text", 0)} title="Block quote">
          <i className="fa-solid fa-quote-right"></i>
        </div>
        <div
          title="Link"
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
    <div className="field">
      <h2>{formProps.contentLabel}</h2>
      {renderError(formProps.meta.error, formProps.meta.touched)}
      {renderOptions(formProps)}
      <textarea
        ref={formProps.questionContentEl}
        className={"text-area " + styleClass}
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
    console.log("Proba");
    console.log(formValues);
    props.onSubmit(formValues);
  };
  const renderButton = () => {
    let bClass = props.isSigned ? "primary" : "disabled";
    let title = props.isSigned
      ? `Click to ${props.submitText}`
      : `Sign in to ${props.submitText}`;
    return (
      <div title={title}>
        <button className={"ui button " + bClass}>{props.submitText}</button>
      </div>
    );
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
      {renderButton()}
    </form>
  );
}

const validate = (formInputs) => {
  let error = {};
  if (!formInputs.title || formInputs.title.length < 10) {
    error.title = "Title must be at least 10 charachters long!";
  }
  if (!formInputs.description || formInputs.description.length < 20) {
    error.description = "Description must be at least 20 charachters long!";
  }
  return error;
};

const formPostForm = reduxForm({
  form: "postForm",
  validate,
  enableReinitialize: true,
})(PostForm);

const mapStateToProps = (state) => {
  return { isSigned: state.auth.isSigned };
};

export default connect(mapStateToProps)(formPostForm);

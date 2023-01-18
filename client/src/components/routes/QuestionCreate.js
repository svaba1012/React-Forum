import React, { useRef } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import showdown from "showdown";

import "./QuestionCreate.css";

function QuestionCreate(props) {
  let questionContentEl = useRef();

  const renderTitleInput = (formProps) => {
    return (
      <div className="ui segment">
        <h2>Question title</h2>
        <div className="ui input fluid">
          <input
            placeholder="In short terms describe your question..."
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
        "content",
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

  const markupTranslate = (text) => {
    let converter = new showdown.Converter();
    return converter.makeHtml(text);
  };

  const renderContentInput = (formProps) => {
    const renderQuestionPreview = () => {
      return (
        <div className="ui segment">
          <h3>Question Preview</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: markupTranslate(formProps.input.value),
            }}
          ></div>
        </div>
      );
    };

    return (
      <div className="ui segment">
        <h2>Question content</h2>
        {renderOptions(formProps)}
        <textarea
          ref={questionContentEl}
          className="text-area"
          rows={10}
          cols={130}
          placeholder="Describe in details your question..."
          onChange={formProps.input.onChange}
          value={formProps.input.value}
        />
        {renderQuestionPreview()}
      </div>
    );
  };

  return (
    <form>
      <Field name="title" component={renderTitleInput}></Field>
      <Field name="content" component={renderContentInput}></Field>
    </form>
  );
}

const FormQuestionCreate = reduxForm({
  form: "questionCreate",
})(QuestionCreate);

const mapStateToProps = (state) => {
  return { question: null };
};

export default connect(mapStateToProps)(FormQuestionCreate);

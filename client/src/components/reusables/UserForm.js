import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import "./UserForm.css";

const renderInput = (formProps) => {
  if (formProps.inputType === "input") {
    return (
      <div className="ui labeled action input" style={{ width: "60%" }}>
        <div className="ui label" style={{ width: "40px" }}>
          {formProps.label}
        </div>
        <input
          type="text"
          {...formProps.input}
          placeholder={formProps.placeholder}
        />
        <button className="ui primary button">{formProps.submitText}</button>
      </div>
    );
  }

  return (
    <div>
      <textarea
        className="textarea"
        {...formProps.input}
        placeholder={formProps.placeholder}
        rows={10}
      ></textarea>
      <button className="ui primary button">{formProps.submitText}</button>
    </div>
  );
};

function userForm(props) {
  const onSubmit = (formValues) => {
    props.onSubmit(formValues[props.name]);
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <Field
        name={props.name}
        component={renderInput}
        label={props.label}
        placeholder={props.placeholder}
        submitText={props.submitText}
        inputType={props.inputType}
      />
    </form>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { form: ownProps.name + "UserForm" };
};

const red = reduxForm({
  enableReinitialize: true,
})(userForm);

export default connect(mapStateToProps)(red);

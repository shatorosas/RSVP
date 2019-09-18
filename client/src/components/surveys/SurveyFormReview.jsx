import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({ onBack, formValues, submitSurvey, saveSurvey }) => {
  const component = formFields.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries </h5>
      <div>
        {component}
        <div style={{ paddingTop: "20px" }}>
          <button
            className="yellow darken-3 waves-effect btn waves-light white-text"
            onClick={onBack}
          >
            Back
            <i className="material-icons left">undo</i>
          </button>
          <button
            className="teal waves-effect waves-light btn right white-text"
            onClick={() => submitSurvey(formValues)}
          >
            Send Survey
            <i className="material-icons right">email</i>
          </button>
          <button
            className="green waves-effect waves-light btn right white-text"
            style={{marginRight:"10px"}}
            onClick={() => saveSurvey(formValues)}
          >
            Save Draft
            <i className="material-icons right">save</i>
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(
  mapStateToProps,
  actions
)(SurveyFormReview);

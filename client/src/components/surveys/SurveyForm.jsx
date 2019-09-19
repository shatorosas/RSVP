import React from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import SurveyField from "./SurveyField";
import formFields from "./formFields";
import { fetchSurvey } from "../../actions";
import { connect } from "react-redux";

class SurveyForm extends React.Component {
  renderFields() {
    return (
      <div>
        {formFields.map(field => {
          return (
            <Field
              key={field.name}
              type="text"
              {...field}
              component={SurveyField}
            />
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onShowFormReview)}>
          {this.renderFields()}
          <div
            style={{
              padding: "20px",
              left: "0px",
              bottom: "0px",
              position: "absolute",
              width: "100%"
            }}
          >
            <Link
              to="/surveys"
              className="red waves-effect waves-light btn white-text"
            >
              <i className="material-icons left">cancel</i>
              Cancel
            </Link>
            <button
              type="submit"
              className="teal waves-effect waves-light btn right white-text"
            >
              Next
              <i className="material-icons right">done</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  formFields.forEach(({ name }) => {
    if (!values[name]) errors[name] = "*required";
  });

  if (!errors.emails) {
    errors.emails = validateEmails(values.emails);
  }
  return errors;
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.selectedSurveyId) {
    const selectedSurvey = state.surveys.find(survey => {
      return survey._id === ownProps.selectedSurveyId;
    });

    return { initialValues: selectedSurvey };
  }
  return {};
};

SurveyForm = reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);

SurveyForm = connect(
  mapStateToProps,
  { fetchSurvey }
)(SurveyForm);
export default SurveyForm;
/*
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    { fetchSurvey }
  )(SurveyForm)
);*/

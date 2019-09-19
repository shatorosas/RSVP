import React from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import FormField from "./FormField";
import formFields from "./formFields";
import { fetchRSVP } from "../../actions";
import { connect } from "react-redux";

class RSVPForm extends React.Component {
  renderFields() {
    return (
      <div>
        {formFields.map(field => {
          return (
            <Field
              key={field.name}
              type="text"
              {...field}
              component={FormField}
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
              to="/rsvps"
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
  if (ownProps.selectedRSVPId) {
    const selectedRSVP = state.rsvps.find(rsvp => {
      return rsvp._id === ownProps.selectedRSVPId;
    });

    return { initialValues: selectedRSVP };
  }
  return {};
};

RSVPForm = reduxForm({
  validate,
  form: "rsvpForm",
  destroyOnUnmount: false
})(RSVPForm);

RSVPForm = connect(
  mapStateToProps,
  { fetchRSVP }
)(RSVPForm);
export default RSVPForm;
/*
export default reduxForm({
  validate,
  form: "rsvpForm",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    { fetchRSVP }
  )(RSVPForm)
);*/

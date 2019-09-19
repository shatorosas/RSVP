import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";

const RSVPFormReview = ({ onBack, formValues, submitRSVP, saveRSVP }) => {
  const component = formFields.map(({ name, label, multiline }) => {
    console.log(multiline);
    return (
      <div key={name}>
        <label>{label}</label>
        <div
          style={multiline ? { maxHeight: "100px", overflow: "auto" } : null}
        >
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries </h5>
      <div>
        {component}
        <div
          style={{
            padding: "20px",
            left: "0px",
            bottom: "0px",
            position: "absolute",
            width: "100%"
          }}
        >
          <button
            className="yellow darken-3 waves-effect btn waves-light white-text"
            onClick={onBack}
          >
            Back
            <i className="material-icons left">undo</i>
          </button>
          <button
            className="teal waves-effect waves-light btn right white-text"
            onClick={() => submitRSVP(formValues)}
          >
            Send RSVP
            <i className="material-icons right">email</i>
          </button>
          <button
            className="green waves-effect waves-light btn right white-text"
            style={{ marginRight: "10px" }}
            onClick={() => saveRSVP(formValues)}
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
    formValues: state.form.rsvpForm.values
  };
}

export default connect(
  mapStateToProps,
  actions
)(RSVPFormReview);

import React from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends React.Component {
  state = { showFormReview: false, selectedSurvey: null };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onBack={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        selectedSurveyId={this.props.match.params.surveyId}
        onShowFormReview={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div
        className="container white"
        style={{ padding: "20px", height: "450px", position: "relative" }}
      >
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({ form: "surveyForm" })(SurveyNew);

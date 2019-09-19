import React from "react";
import { reduxForm } from "redux-form";
import RSVPForm from "./RSVPForm";
import RSVPFormReview from "./RSVPFormReview";

class RSVPWizard extends React.Component {
  state = { showFormReview: false, selectedRSVP: null };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <RSVPFormReview
          onBack={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <RSVPForm
        selectedRSVPId={this.props.match.params.rsvpId}
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

export default reduxForm({ form: "rsvpForm" })(RSVPWizard);

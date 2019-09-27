import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import history from "../history";
import "./app.css";

import Header from "./Header";
import Landing from "./Landing";
import RSVPWizard from "./RSVPs/RSVPWizard";
import Dashboard from "./Dashboard";
import ContactManagement from "./contacts/ContactManagement";
import ContactForm from "./contacts/ContactForm";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const background = "background.png";
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
          height: "100vh",
          backgroundSize: "cover",
          overflow: "hidden"
        }}
      >
        <Router history={history}>
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/contacts" exact component={ContactManagement} />
          <div style={{ height: "100vh", width: "100%", overflow: "auto" }}>
            <Route path="/rsvp" exact component={RSVPWizard} />
            <Route path="/rsvp/:rsvpId" exact component={RSVPWizard} />
            <Route path="/rsvps" exact component={Dashboard} />
            <Route path="/contactForm" exact component={ContactForm} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);

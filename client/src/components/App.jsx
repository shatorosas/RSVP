import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import history from "../history";

import Header from "./Header";
import Landing from "./Landing";
import RSVPWizard from "./RSVPs/RSVPWizard";
import Dashboard from "./Dashboard";

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
          <div style={{ height: "100vh", width: "100%", overflow: "auto" }}>
            <Route path="/surveys/new" exact component={RSVPWizard} />
            <Route path="/surveys/new/:surveyId" exact component={RSVPWizard} />
            <Route path="/surveys" exact component={Dashboard} />
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

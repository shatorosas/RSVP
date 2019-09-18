import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import history from "../history";

import Header from "./Header";
import Landing from "./Landing";
import SurveyNew from "./surveys/SurveyNew";
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
          backgroundRepeat: "repeat",
          backgroundPosition: "top center"
        }}
      >
        <div className="container">
          <Router history={history}>
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/surveys/new" exact component={SurveyNew} />
            <Route path="/surveys/new/:surveyId" exact component={SurveyNew} />
            <Route path="/surveys" exact component={Dashboard} />
          </Router>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);

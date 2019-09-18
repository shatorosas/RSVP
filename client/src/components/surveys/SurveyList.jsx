import React from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      let notResponded = (survey.totalRecipients || 0) - survey.yes - survey.no;
      notResponded = notResponded < 0 ? 0 : notResponded;

      var conf = {
        options: {
          labels: [
            `Yes: ${survey.yes}`,
            `No: ${survey.yes}`,
            `Not responded: ${notResponded}`
          ],
          colors: ["#3EAD26", "#C40404", "#FFC300"],
          legend: {
            position: "bottom",
            horizontalAlign: "center"
          }
        },
        series: [survey.yes, survey.no, notResponded]
      };

      return (
        <div key={survey._id} className="col s12 m12 l12">
          <h5 className="header">{survey.title}</h5>
          <div className="card horizontal" style={{ height: "300px" }}>
            {survey.status === 1 ? (
              <ReactApexChart
                style={{ marginTop: "20px" }}
                options={conf.options}
                series={conf.series}
                type="pie"
                width="300"
              />
            ) : (
              <img
                alt="draft"
                src="Draft.png"
                width="300"
                style={{ objectFit: "contain" }}
              />
            )}
            <div className="card-stacked">
              <div className="card-content">
                <Scrollbars style={{ height: "180px", width: "100%" }}>
                  <p>{survey.body}</p>
                </Scrollbars>
              </div>
              <div className="card-action">
                <Link
                  to={`/surveys/new/${survey._id}`}
                  className={
                    survey.status === 0
                      ? "waves-effect waves-light btn right"
                      : "waves-effect waves-light btn right disabled"
                  }
                >
                  <i className="material-icons right ">edit</i>Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <Scrollbars style={{ height: "93vh", width: "100%" }}>
        <div className="row">{this.renderSurveys()}</div>
      </Scrollbars>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);

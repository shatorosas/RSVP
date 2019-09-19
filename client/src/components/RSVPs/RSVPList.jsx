import React from "react";
import { connect } from "react-redux";
import { fetchRSVPs } from "../../actions";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

class RSVPList extends React.Component {
  componentDidMount() {
    this.props.fetchRSVPs();
  }

  renderRSVPs() {
    return this.props.rsvps.reverse().map(rsvp => {
      let notResponded = (rsvp.totalRecipients || 0) - rsvp.yes - rsvp.no;
      notResponded = notResponded < 0 ? 0 : notResponded;

      var conf = {
        options: {
          labels: ["Yes", "No", "Not responded"],
          colors: ["#3EAD26", "#C40404", "#FFC300"],
          legend: {
            position: "bottom",
            horizontalAlign: "center"
          }
        },
        series: [rsvp.yes, rsvp.no, notResponded]
      };

      return (
        <div key={rsvp._id} className="col s12 m12 l12">
          <h5 className="header">{rsvp.title}</h5>
          <div className="card horizontal" style={{ height: "300px" }}>
            {rsvp.status === 1 ? (
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
              <div className="card-content" style={{ overflow: "auto" }}>
                <p>{rsvp.body}</p>
              </div>
              <div className="card-action">
                <Link
                  to={`/rsvp/${rsvp._id}`}
                  className={
                    rsvp.status === 0
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
    return <div className="row container">{this.renderRSVPs()}</div>;
  }
}

function mapStateToProps({ rsvps }) {
  return { rsvps };
}

export default connect(
  mapStateToProps,
  { fetchRSVPs }
)(RSVPList);

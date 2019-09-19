import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import M from "materialize-css";

class Header extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const elems = document.querySelectorAll(".dropdown-trigger");

      M.Dropdown.init(elems, {
        inDuration: 300,
        outDuration: 225,
        //hover: true,
        coverTrigger: false,
        constrainWidth: false,
        alignment: "right"
      });
    }
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a
              href="/auth/google"
              className="waves-effect waves-light btn white darken-4 black-text"
              style={{ textTransform: "none" }}
            >
              <img
                style={{ height: "20px", top: "5px" }}
                alt="google"
                src="googleIcon.png"
              />
              &nbsp; Login with Google
            </a>
          </li>
        );
      default:
        return (
          <React.Fragment>
            <li>
              <Payments />
            </li>
            <li style={{ margin: "0 10px" }}>
              Credits: {this.props.auth.credits}
            </li>
            <li>
              <a
                style={{ height: "65px", width: "65px" }}
                className="dropdown-trigger"
                href="#!"
                data-target="dropdown1"
              >
                <img
                  style={{
                    height: "50px",
                    width: "50px",
                    marginLeft: "-7px",
                    marginTop: "7px"
                  }}
                  src={this.props.auth.picture}
                  alt=""
                  className="circle"
                />
              </a>
            </li>
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <Link to="/">
              <i className="material-icons" style={{ margin: "0 2px 0 0" }}>
                home
              </i>
              Home
            </Link>
          </li>
          <li>
            <Link to="/surveys">
              <i className="material-icons" style={{ margin: "0 2px 0 0" }}>
                library_books
              </i>
              Surveys
            </Link>
          </li>
          <li>
            <a href="/api/logout">
              <i
                className="material-icons"
                style={{ margin: "0 2px 0 0", color: "red" }}
              >
                power_settings_new
              </i>
              Logout
            </a>
          </li>
        </ul>
        <nav>
          <div className="nav-wrapper">
            <Link
              to={this.props.auth ? "/surveys" : "/"}
              className="left "
              style={{ height: "45px" }}
            >
              <img
                alt="rsvper"
                src="logo.png"
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  height: "45px"
                }}
              />
            </Link>
            <ul id="nav-mobile" className="right">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);

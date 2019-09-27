import React from "react";
import "./landing.css";
import Payments from "./Payments";

const Landing = () => {
  return (
    <div className="center landing__main">
      <section
        className="welcome"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('./background-logo.png')"
        }}
      >
        <h2>
          Send RSVP's to anyone <br />
          you want!
        </h2>
        <Payments className="left btn-landing" />
      </section>
      <section className="instructions">
        <div className="row">
          <h2>Simple as 1, 2, 3</h2>
        </div>
        <div className="row">
          <div className="col s12 m6 l4">
            <div className="card hoverable">
              <div className="card-image ">
                <img src="1.png" alt="1" />
                <span className="card-title">Click</span>
              </div>
              <div className="card-content">
                <p>Click Add credits.</p>
              </div>
            </div>
          </div>
          <div className="col s12 m6 l4">
            <div className="card hoverable">
              <div className="card-image grey lighten-2">
                <img src="2.png" alt="2" />
                <span className="card-title ">Add</span>
              </div>
              <div className="card-content">
                <p>Use the Demo creadit card number.</p>
              </div>
            </div>
          </div>
          <div className="col s12 m6 l4">
            <div className="card hoverable">
              <div className="card-image ">
                <img src="3.png" alt="3" />
                <span className="card-title">Send!</span>
              </div>
              <div className="card-content">
                <p>Start sending RSVPs to anyone you want!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="row">
          <div className="col s6 m6 l6">
            <ul className="footer-nav">
              <li>
                {" "}
                <a
                  href="https://gabrielrosas.herokuapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About us
                </a>{" "}
              </li>
            </ul>
          </div>
          <div className="col s6 m6 l6">
            <ul className="social-links">
              <li>
                <a
                  href="https://github.com/shatorosas/RSVP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="icon ion-logo-github"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/gabriel-rosas/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="icon ion-logo-linkedin "></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          Copyright &copy; 2019 by Shato's Developmet. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;

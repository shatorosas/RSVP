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
        <div class="row">
          <div class="col s12 m6 l4">
            <div class="card hoverable">
              <div class="card-image ">
                  <img src="1.png" />
                <span class="card-title">Click</span>
              </div>
              <div class="card-content">
                <p>Click Add credits.</p>
              </div>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <div class="card hoverable">
              <div class="card-image black">
                <img src="2.png" />
                <span class="card-title">Add</span>
              </div>
              <div class="card-content">
                <p>Use the Demo creadit card number.</p>
              </div>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <div class="card hoverable">
              <div class="card-image black">
                <img src="3.png" />
                <span class="card-title">Send!</span>
              </div>
              <div class="card-content">
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
                <a href="https://gabrielrosas.herokuapp.com/">About us</a>{" "}
              </li>
            </ul>
          </div>
          <div className="col s6 m6 l6">
            <ul className="social-links">
              <li>
                {" "}
                <a href="https://github.com/shatorosas/RSVP" target="_blank">
                  {" "}
                  <i className="icon ion-logo-github"></i>
                </a>{" "}
              </li>
              <li>
                {" "}
                <a
                  href="https://www.linkedin.com/in/gabriel-rosas/"
                  target="_blank"
                >
                  {" "}
                  <i className="icon ion-logo-linkedin "></i>
                </a>{" "}
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

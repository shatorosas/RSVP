import React from "react";
import { Link } from "react-router-dom";
import RSVPList from "./RSVPs/RSVPList";
const Dashboard = () => {
  return (
    <div>
      <RSVPList />
      <div className="fixed-action-btn">
        <Link to="/rsvp" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

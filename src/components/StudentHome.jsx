import React from "react";
import StudentHeader from "./StudentHeader";
import { Link } from "react-router-dom";

function Front() {
  return (
    <div>
      <StudentHeader />
      <div className="row container-fluid">
        <div className="col-lg-4 container-fluid text">
          <h1>
            <b>Get Placed In Best Company....</b>
          </h1>
          
          <br />
          <Link to="/jobs">
            <button className="btn btn-large btn-dark btn-width">View Companies</button>
          </Link>
        </div>
        <div className="col-lg-8 container-fluid">
          <img className="img-fluid" src="../../Photos/coding.png" />
        </div>
      </div>
    </div>
  );
}
export default Front;

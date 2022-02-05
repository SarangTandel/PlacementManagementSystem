import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Middle() {
  return (
    <div className="row container-fluid">
      <div className="col-lg-4 container-fluid text">
        <h1>
          <b>Get Placed In Best Company....</b>
        </h1>
        <Link to="/jobs">
          <button className="btn btn-large btn-dark">View Company</button>
        </Link>
      </div>
      <div className="col-lg-8 container-fluid">
        <img className="img-fluid" src="../../Photos/coding.png" />
      </div>
    </div>
  );
}
export default Middle;

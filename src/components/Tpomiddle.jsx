import React from "react";
import { Link } from "react-router-dom";

function Tpomiddle() {
  return (
    <div className="row container-fluid">
      <div className="col-lg-4 container-fluid text">
        <h3>
          <b>View upcoming companies ....</b>
        </h3>
        <Link to="/tpoDashboard">
          <button className="btn btn-large btn-dark">Company</button>
        </Link>

        <h3>
          <b>View companies request....</b>
        </h3>
        <Link to="/tpoIncomingRequest">
          <button className="btn btn-large btn-dark">Request</button>
        </Link>
      </div>
      <div className="col-lg-8 container-fluid">
        <img className="img-fluid" src="../../Photos/tpo.png" />
      </div>
    </div>
  );
}
export default Tpomiddle;

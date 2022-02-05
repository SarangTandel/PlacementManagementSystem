import axios from "axios";
import React, { useEffect, useState } from "react";
import TpoHeader from "./TpoHeader";
import { Link } from "react-router-dom";

function Tpoalldetails() {
  const [requestJobs, setRequestJobs] = useState([]);

  /* const fetchJob = async () => {
    const response = await axios.post("/tpoRequestedJobs");
    console.log("pk", response.data.data);
    setRequestJobs(response.data.data);
  };

  useEffect(() => {
    fetchJob();
  }, []); */

  return (
    <div>
      <TpoHeader />

      <div className="row container-fluid">
        <div className="col-lg-4 container-fluid text">
          <h1>
            <b>Hire Best Talent ....</b>
          </h1>
          <br />

          <Link to="/tpoIncomingRequest">
            <button className="btn btn-large btn-dark btn-width">
              Incoming Request
            </button>
          </Link>
          <br />

          <br />
          <Link to="/tpoAcceptedRequest">
            <button className="btn btn-large btn-dark btn-width">
              Upcoming company
            </button>
          </Link>

          <br />

          <br />
          <Link to="/addStudent">
            <button className="btn btn-large btn-dark btn-width">
              Add Student
            </button>
          </Link>
        </div>
        <div className="col-lg-8 container-fluid">
          <img className="img-fluid" src="../../Photos/company.png" />
        </div>
      </div>
    </div>
  );
}
export default Tpoalldetails;

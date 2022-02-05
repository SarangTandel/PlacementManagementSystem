import axios from "axios";
import React, { useEffect, useState } from "react";
import CompanyHeader from "./CompanyHeader";
import { Link } from "react-router-dom";

function Companydetails() {
  const [jobs, setJobs] = useState([]);
  
  const fetchJob = async () => {
    const response = await axios.post("/GetAllJobsOfCompany",{
      company_id:localStorage.getItem("company_id")
    });
    console.log(response.data.jobs);
    setJobs(response.data.jobs);
  };

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <div>
      <CompanyHeader />
      <h3 className="main-heading">All Jobs</h3>
      {jobs.length === 0 && <p className="main-heading">No job Posted</p>}
      {jobs.map((job) => (
        <div className="dbox" key={job._id}>
          <div className="sbox">
            <b>JobTitle:</b>
            {job.jobTitle}
          </div>
          <div className="sbox">
            <b>JobDescription:</b> {job.jobDescription}
          </div>
          <div className="sbox">
            <b>Number Of Opening :</b> {job.numberOfOpening}
          </div>
          <div className="sbox">
            <b>Ctc Range :</b> {job.ctcRange}
          </div>
          <div className="sbox">
            <b>Job Location :</b>
            {job.jobLocation}
          </div>
          <div className="sbox">
            <b>Status :</b>
            {job.status}
          </div>
          {
            job.candidates.length > 0 && 
            <div>
              <h6>List of Candidates who applied</h6>
              {job.candidates.map(student => <p>{student}</p>)}
            </div>
          }
          {console.log(job.candidates)}
        </div>
      ))}
    </div>
  );
}
export default Companydetails;

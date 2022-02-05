import axios from "axios";
import React, { useEffect, useState } from "react";
import StudentHeader from "./StudentHeader";

function Details() {
  const [jobs, setJobs] = useState([]);
  const fetchJob = async () => {
    const response = await axios.post("/getAvailableJobForStudent");
    console.log(response.data.alljob);
    setJobs(response.data.alljob);

    axios.get("/isAuthenticate",{})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  };

  const applyForJob = (e, job_id) => {
    e.preventDefault();
    axios.post("/addStudentToJob",{
      job_id,
      student_email:localStorage.getItem("student_email")
    })
    .then(res => {
      console.log(res);
      fetchJob();
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <div>
      <StudentHeader />

      <h3 className="main-heading">All Jobs</h3>
      {jobs.length === 0 && <h4 className="main-heading">No new Jobs</h4>}
      {jobs.length > 0 && jobs.map((job) => (
        <div className="dbox" key={job._id}>
          <div className="sbox">
            <b>JobTitle:</b> {job.jobTitle}
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
          {
            job.candidates.findIndex(email => email === localStorage.getItem("student_email")) !== -1 ?
            <button className="btn btn-large btn-success" disabled={true} > Applied </button> :
            <button className="btn btn-large btn-success " onClick={(e) => applyForJob(e,job._id)}> Apply </button>
          }
          </div>
      ))}
    </div>
  );
}
export default Details;

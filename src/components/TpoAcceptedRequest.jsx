import axios from "axios";
import React, { useEffect, useState } from "react";
import StudentHeader from "./StudentHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Details() {
  const [jobs, setJobs] = useState([]);
  const fetchJob = async () => {
    const response = await axios.post("/getAvailableJobForStudent");
    console.log(response.data.alljob);
    setJobs(response.data.alljob);
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const rejectJobRequest = (job_id) => {
    axios
      .post("/RejectJobRequest", {
        job_id,
      })
      .then((res) => {
        console.log(res);
        fetchJob();
        toast.success("Successfully rejectd the request", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <StudentHeader />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h3 className="main-heading">All Upcoming Jobs</h3>
      {jobs.length === 0 && <h4 className="main-heading">No new Jobs</h4>}
      {jobs.length > 0 && jobs.map((job,index) => (
        <div className="dbox" key={index}>
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
          <button
              className="btn btn-large btn-danger dbtn"
              onClick={() => rejectJobRequest(job._id)}
              name="reject"
              value={job._id}
            >
              <i className="fas fa-times"></i> Decline{" "}
            </button>
        </div>
      ))}
    </div>
  );
}
export default Details;

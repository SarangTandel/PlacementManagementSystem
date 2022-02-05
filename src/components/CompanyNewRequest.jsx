import React, { useState } from "react";
import CompanyHeader from "./CompanyHeader";
import axios from "axios";
function Companyhire() {
  const [formdata, setformdata] = useState({
    title: "",
    description: "",
    numberOfOpening: "",
    ctcRange: "",
    jobLocation: "",
    company_id: localStorage.getItem("company_id"),
  });

  function submitform(event) {
    event.preventDefault();
    const finaldata = formdata;
    axios
      .post("/requestToAddJob", finaldata)
      .then((response) => {
        console.log("Success");
        window.location.replace("/companyDashboard");
      })
      .catch(() => {
        console.log("fail");
      });
  }

  function handleChange(event) {
    setformdata({ ...formdata, [event.target.name]: [event.target.value] });
  }

  return (
    <div>
      <CompanyHeader />
      <div className="full-height">
        <form
          className="registerform container-fluid"
          method="POST"
          onSubmit={submitform}
        >
          <h1 className="heading">Looking to hire Developers?</h1>
          <div className="fname container-fluid">
            <input
              type="text"
              className="fname1"
              name="title"
              onChange={handleChange}
              placeholder="Job Title"
              required
            />
          </div>
          <div className="lname container-fluid">
            <input
              type="text"
              className="lname1"
              name="description"
              onChange={handleChange}
              placeholder="Job Description"
              required
            />
          </div>
          <div className="phno container-fluid">
            <input
              type="number"
              className="phno1"
              name="numberOfOpening"
              onChange={handleChange}
              placeholder="Number Of Opening"
              required
            />
          </div>
          <div className="phno container-fluid">
            <input
              type="text"
              className="phno1"
              name="ctcRange"
              onChange={handleChange}
              placeholder="ctcRange"
              required
            />
          </div>
          <div className="phno container-fluid">
            <input
              type="text"
              className="phno1"
              name="jobLocation"
              onChange={handleChange}
              placeholder="Job Location"
              required
            />
          </div>

          <br />

          <br />

          <input
            type="submit"
            className="btn-primary btn-lg accbtn"
            value="Submit"
            name="Log in"
          />
        </form>
      </div>
    </div>
  );
}
export default Companyhire;

import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
    type: "",
  });

  const history = useHistory();

  const [wrong, setvalue] = useState("");

  function stateChange(event) {
    setformdata({ ...formdata, [event.target.name]: [event.target.value] });
  }

  function submitData(event) {
    event.preventDefault();
    const finaldata = formdata;
    console.log(finaldata);
    axios
      .post("/login", finaldata)
      .then((response) => {
        var check = response.data.err;
        if (check === "incorrect username!!") {
          setvalue(check);
        } else if (check === "incorrect password!!") {
          setvalue(check);
        } else if (check === "student") {
          history.push("/");
        } else if (check === "teacher") {
          history.push("/teacher");
        }

        if (formdata.type[0] === "company") {
          localStorage.setItem(
            "company_id",
            response.data.user[0]._id.toString()
          );
          history.push("/companyDashboard");
        }

        if (formdata.type[0] === "student") {
          localStorage.setItem(
            "student_id",
            response.data.user[0]._id.toString()
          );
          localStorage.setItem(
            "student_email",
            response.data.user[0].email.toString()
          );
          history.push("/");
        }

        console.log(formdata.type[0]);
        if (formdata.type[0] === "tpo") {
          history.push("/tpoDashboard");
        }

        console.log(response.data.user[0]);
      })

      .catch(() => {
        console.log("Data Has not been send, Internal Server Error");
      });
  }
  const { email, password, type } = formdata;
  return (
    <div className="loginform container-fluid full-height">
      <form className="lform" onSubmit={submitData}>
        <h1 className="heading main-heading">Login to The Account</h1>
        <div className="email container-fluid">
          <input
            type="text"
            className="email1"
            value={email}
            name="email"
            placeholder="Email"
            onChange={stateChange}
            required
          />
        </div>
        <div className="password container-fluid">
          <input
            type="password"
            className="password1"
            value={password}
            name="password"
            placeholder="Password"
            onChange={stateChange}
            required
          />
        </div>
        <p>{wrong}</p>

        <div className="option">
          <h5 className="">Login As :</h5>
          <input
            type="radio"
            id="Student"
            className="rbtn1"
            name="type"
            value="student"
            onChange={stateChange}
            required
          />
          <label className="rbtn">Student</label>
          <input
            type="radio"
            id="Company"
            className="rbtn1"
            name="type"
            value="company"
            onChange={stateChange}
            required
          />
          <label className="rbtn">Company</label>
          <input
            type="radio"
            id="Tpo"
            className="rbtn1"
            name="type"
            value="tpo"
            onChange={stateChange}
            required
          />
          <label className="rbtn">TPO</label>
          <br />
        </div>

        <input
          type="submit"
          className="btn-primary btn-sm logbtn"
          value="Log in"
          name="Log in"
        />
      </form>

      <div className="rform">
        <p className="signup">Need an Account For Company?</p>

        <Link to="/register">
          <input
            type="submit"
            className="btn-primary btn-sm logbtn"
            value="Register Company"
            name="Register Company"
          />
        </Link>
      </div>
    </div>
  );
}

export default Login;

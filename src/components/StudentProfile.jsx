import axios from "axios";
import React, { useState, useEffect } from "react";
import StudentHeader from "./StudentHeader";

function Form() {
  
  const [profileData, setProfileData] = useState({
    name: "",
    cgpa: 0,
    college_id: "",
    branch: "",
    resumeLink: "",
    linkedin_profile: "",
    codechef_profile: "",
    leetcode_profile: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    cgpa: 0,
    college_id: "",
    branch: "",
    resumeLink: "",
    linkedin_profile: "",
    codechef_profile: "",
    leetcode_profile: "",
  });
  const [updateData, setUpdateData] = useState(false);

  const getStudentDetail = () => {
    axios
      .post("/getStudentData", {
        student_id: localStorage.getItem("student_id"),
      })
      .then((res) => {
        console.log("getStudentData ", res.data.student);
        let student = res.data.student;
        setProfileData({
          name: student.name,
          cgpa: student.cgpa,
          college_id: student.college_id,
          branch: student.branch,
          resumeLink: student.resumeLink,
          linkedin_profile: student.linkedin_profile,
          codechef_profile: student.codechef_profile,
          leetcode_profile: student.leetcode_profile,
        });
        setFormData({
          name: student.name,
          cgpa: student.cgpa,
          college_id: student.college_id,
          branch: student.branch,
          resumeLink: student.resumeLink,
          linkedin_profile: student.linkedin_profile,
          codechef_profile: student.codechef_profile,
          leetcode_profile: student.leetcode_profile,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getStudentDetail, []);

  function changedata() {
    if (!updateData) {
      setUpdateData(1);
    } else {
      submitform();
    }
  }

  function submitform(event) {
   
    const finaldata = formData;
    console.log(formData);
    
    axios
      .post("/updateStudentProfile", {
        student_id: localStorage.getItem("student_id"),
        name: formData.name,
        cgpa: formData.cgpa,
        college_id: formData.college_id,
        branch: formData.branch,
        resumeLink: formData.resumeLink,
        linkedin_profile: formData.linkedin_profile,
        codechef_profile: formData.codechef_profile,
        leetcode_profile: formData.leetcode_profile,
      })
      .then((response) => {
        console.log("Success");
        getStudentDetail();
        setUpdateData(0);
      })
      .catch(() => {
        console.log("fail");
        setUpdateData(0);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="full-height">
      <StudentHeader />
      <div className="full-height">
        <form
          class="registerform container-fluid"
          onSubmit={() => {}}
        >
          {updateData ? (
            <h1 className="main_heading">Update Your Profile.... </h1>
          ) : (
            <h1 className="main_heading">Profile</h1>
          )}
          <div className="student-profile-container">
            {!updateData ? (
              <div className="box">
                Name :
                <p>{profileData.name.length > 0 ? profileData.name : "none"}</p>
              </div>
            ) : (
              <div class="fname container-fluid box box">
                <input
                  value={formData.name}
                  type="text"
                  class="fname1"
                  name="name"
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
            )}
            {!updateData ? (
              <div className="box">
                CGPA :
                <p>{profileData.cgpa !== 0 ? profileData.cgpa : "none"}</p>
              </div>
            ) : (
              <div class="lname container-fluid box">
                <input
                  value={formData.cgpa}
                  type="number"
                  class="lname1"
                  name="cgpa"
                  onChange={handleChange}
                  placeholder="CGPA"
                />
              </div>
            )}
            {!updateData ? (
              <div className="box">
                College id :
                <p>
                  {profileData.college_id.length > 0
                    ? profileData.college_id
                    : "none"}
                </p>
              </div>
            ) : (
              <div class="phno container-fluid box">
                <input
                  value={formData.college_id}
                  type="text"
                  class="phno1"
                  name="college_id"
                  onChange={handleChange}
                  placeholder="ID"
                />
              </div>
            )}
            {!updateData ? (
              <div className="box">
                Branch :
                <p>
                  {profileData.branch.length > 0 ? profileData.branch : "none"}
                </p>
              </div>
            ) : (
              <div class="phno container-fluid box">
                <input
                  value={formData.branch}
                  type="text"
                  class="phno1"
                  name="branch"
                  onChange={handleChange}
                  placeholder="Branch"
                />
              </div>
            )}
            {!updateData ? (
              <div className="box">
                Resume link :
                <p>
                  {profileData.resumeLink.length > 0
                    ? profileData.resumeLink
                    : "none"}
                </p>
              </div>
            ) : (
              <div class="phno container-fluid box">
                <input
                  value={formData.resumeLink}
                  type="text"
                  class="phno1"
                  name="resumeLink"
                  onChange={handleChange}
                  placeholder="Resume Link"
                />
              </div>
            )}
            Additional Details :
            {!updateData ? (
              <div className="box">
                Linkedin :
                <p>
                  {profileData.linkedin_profile.length > 0
                    ? profileData.name
                    : "none"}
                </p>
              </div>
            ) : (
              <div class="phno container-fluid box">
                <input
                  value={formData.linkedin_profile}
                  type="text"
                  class="phno1"
                  name="linkedin_profile"
                  onChange={handleChange}
                  placeholder="Linkedin Profile Link"
                />
              </div>
            )}
            {!updateData ? (
              <div className="box">
                Codechef :
                <p>
                  {profileData.codechef_profile.length > 0
                    ? profileData.codechef_profile
                    : "none"}
                </p>
              </div>
            ) : (
              <div class="phno container-fluid box">
                <input
                  value={formData.codechef_profile}
                  type="text"
                  class="phno1"
                  name="codechef_profile"
                  onChange={handleChange}
                  placeholder="Codechef Profile Link"
                />
              </div>
            )}
            {!updateData ? (
              <div className="box">
                Leetcode :
                <p>
                  {profileData.leetcode_profile.length > 0
                    ? profileData.leetcode_profile
                    : "none"}
                </p>
              </div>
            ) : (
              <div class="phno container-fluid box">
                <input
                  value={formData.leetcode_profile}
                  type="text"
                  class="phno1"
                  name="leetcode_profile"
                  onChange={handleChange}
                  placeholder="Leet Code Profile Link"
                />
              </div>
            )}
            <br />
            <br />
            {!updateData ? (
              <button class="btn-primary btn-lg accbtn" onClick={changedata}>
                Update Profile
              </button>
            ) : (
              <input
                value={formData.name}
                type="submit"
                class="btn-primary btn-lg accbtn"
                value="Save"
                name="Log in"
                onClick={changedata}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Form;

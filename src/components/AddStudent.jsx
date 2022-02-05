import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddStudent() {
  const fileUploadRef = useRef();
  const [disableAdd, setDisableAdd] = useState(false);
  const [data, setData] = useState({
    email: "",
  });
  const [students, setStudents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("ch");
  };

  function handleFiles() {
    // Check for the various File API support.
    if (window.FileReader) {
      // FileReader are supported.
      console.log(selectedFile);
      getAsText(selectedFile);
    } else {
      alert("FileReader are not supported in this browser.");
    }
  }

  function getAsText(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
  }

  function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);
  }

  function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    const lines = [];
    for (var i = 0; i < allTextLines.length; i++) {
      var data = allTextLines[i].split(";");
      var tarr = [];
      for (var j = 0; j < data.length; j++) {
        tarr.push(data[j]);
      }
      lines.push(tarr);
    }
    lines.pop();
    setStudents(lines);
    console.log(lines);
  }

  function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
      alert("Canno't read file !");
    }
  }

  const addManyStudent = (e) => {
    e.preventDefault();
    handleFiles();
    //setDisableAdd(true);

    if (students.length > 0) {
      let success = 0;

      students.map((student,index) => {
        axios
          .post("/addStudent", {
            email: student[0],
          })
          .then((res) => {
            console.log(res.data.message);

            if (res.data.message === "already There") {
              toast.error(`${student[0]} Account Already Exist`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              success += 1;
              console.log(index);
              if(index === students.length - 1)
              {
                if (success > 0) {
                  toast.success(`${success} Account created`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
    fileUploadRef.current.value = "";
  };

  const addNewStudent = (e) => {
    e.preventDefault();
    console.log(data.email[0]);
    axios
      .post("/addStudent", {
        email: data.email[0],
      })
      .then((res) => {
        console.log(res.data.message);

        if (res.data.message === "already There") {
          toast.error("Account Already Exist", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success("Account created", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        /* if(res.data.message === "account Created")
        {
            Email.send({
                Host : "smtp.gmail.com",
                Username : "username",
                Password : "password",
                To : data.email[0],
                From : "you@isp.com",
                Subject : "Your Account Details",
                Body : {"UserName - " + ""}
            }).then(
              message => alert(message)
            );
        } */
        setData({
          email: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function stateChange(event) {
    setData({ ...data, [event.target.name]: [event.target.value] });
  }

  return (
    <div className="loginform container-fluid full-height horizontal-center">
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
      <form className="lform" onSubmit={addNewStudent}>
        <div className="email container-fluid">
          <h1 className="">Add Student</h1>
          <input
            type="email"
            className="email1"
            value={data.email}
            name="email"
            placeholder="Email"
            onChange={stateChange}
            required
          />
          <input
            type="submit"
            className="btn-primary btn-sm logbtn mt-3"
            value="Add"
            name="Log in"
          />
        </div>
      </form>
      

      <form className="lform" onSubmit={addManyStudent}>
        <div className="email container-fluid">
          <div className="form-group">
            <label>Upload a CSV File</label>
            <input
              type="file"
              className="form-control-file"
              ref={fileUploadRef}
              id="exampleFormControlFile1"
              required
              name="file"
              onChange={changeHandler}
              accept=".csv"
            />
          </div>

          <button
            //disabled={disableAdd}
            type="submit"
            className="btn-primary btn-sm logbtn"
          >Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;

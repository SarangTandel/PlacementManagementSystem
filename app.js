const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const mongo = require("mongodb");
const app = express();
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));

//For json
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "", //'####youremail####',
    pass: "", //'#####yourpassword####'
  },
});

const tpo_email = "tpo@test.com";

app.use(express.static("public"));

mongoose.connect(
  "mongoDB URI",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const jobSchema = {
  jobTitle: String,
  jobDescription: String,
  numberOfOpening: Number,
  ctcRange: String,
  jobLocation: String,
  status: String,
  company_id: String,
  candidates: [String],
};

const Job = mongoose.model("Job", jobSchema);

const companyschema = {
  name: String,
  email: String,
  number: Number,
  ceo: String,
  hr: String,
  address: String,
  password: String,
};
const company = mongoose.model("company", companyschema);

const studentSchema = {
  email: String,
  password: String,
  appliedJobs: [jobSchema],
  name: String,
  cgpa: Number,
  college_id: String,
  branch: String,
  resumeLink: String,
  linkedin_profile: String,
  codechef_profile: String,
  leetcode_profile: String,
};

const Student = mongoose.model("student", studentSchema);

const tpoSchema = {
  email: String,
  password: String,
};

const Tpo = mongoose.model("Tpo", tpoSchema);

app.post("/register", function (req, res) {
  console.log(req.body);

  let tempuser = req.body.email[0];

  const user = new company({
    name: req.body.name[0],
    email: req.body.email[0],
    number: req.body.phno[0],
    ceo: req.body.ceo[0],
    hr: req.body.hr[0],
    address: req.body.address[0],
    password: req.body.password[0],
    job: [],
  });
  console.log(user);
  user.save();
  res.json({
    msg: "Data received",
  });
});

let logindatauser = [];
let logindataadmin = [];

app.post("/login", function (req, res) {
  var name = req.body.email[0];
  var lpassword = req.body.password[0];
  var type = req.body.type[0];
  var a = "";
  console.log(req.body);
  if (type === "student") {
    Student.find({ email: name }, function (err, userfounds) {
      if (userfounds.length === 0 || err) {
        res.send({ err: "incorrect username!!", user: userfounds });
        console.log("incorrect username!!");
      } else if (userfounds[0].password === lpassword) {
        res.send({ err: req.body.type[0], user: userfounds });
        logindatauser = userfounds;
        console.log(logindatauser);
      } else {
        res.send({ err: "incorrect password!!", user: userfounds });
        console.log("incorrect password!!");
      }
    });
  }

  if (type === "company") {
    company.find({ email: name }, function (err, userfounds) {
      if (userfounds.length === 0 || err) {
        res.send({ err: "incorrect username!!", user: userfounds });
        console.log("incorrect username!!");
      } else if (userfounds[0].password === lpassword) {
        res.send({ err: req.body.type[0], user: userfounds });
        logindataadmin = userfounds;
      } else {
        res.send({ err: "incorrect password!!", user: userfounds });
        console.log("incorrect password!!");
      }
    });
  }

  if (type === "tpo") {
    Tpo.find({ email: name }, function (err, userfounds) {
      if (userfounds.length === 0 || err) {
        res.send({ err: "incorrect username!!", user: userfounds });
        console.log("incorrect username!!");
      } else if (userfounds[0].password === lpassword) {
        res.send({ err: req.body.type[0], user: userfounds });
        logindataadmin = userfounds;
      } else {
        res.send({ err: "incorrect password!!", user: userfounds });
        console.log("incorrect password!!");
      }
    });
  }
});

/* /////////////////////////////////////////////////////////////////////////////////// */

/* When Company want to add new Job */
app.post("/requestToAddJob", function (req, res) {

  const newJob = new Job({
    jobTitle: req.body.title[0],
    jobDescription: req.body.description[0],
    numberOfOpening: req.body.numberOfOpening[0],
    ctcRange: req.body.ctcRange[0],
    jobLocation: req.body.jobLocation[0],
    status: "waiting",
    company_id: req.body.company_id,
    candidates: [],
  });

  newJob.save();

  res.json({ status: "OK" });
});

app.post("/getIncomingRequest", function (req, res) {
  Job.find({ status: "waiting" }, function (err, jobfound) {
    if (err) {
      res.json({ status: "error", error: err });
    } else {
      res.send({ alljob: jobfound });
      console.log(jobfound);
    }
  });
});

app.post("/getAvailableJobForStudent", function (req, res) {
  Job.find({ status: "accepted" }, function (err, jobfound) {
    if (err) {
      res.json({ status: "error" });
    } else {
      res.send({ alljob: jobfound });
      console.log(jobfound);
    }
  });
});

app.post("/AcceptJobRequest", (req, res) => {
  Job.findOneAndUpdate(
    { _id: req.body.job_id },
    { status: "accepted" },
    function (err, success) {
      if (err) {
        res.json({ status: "error", error: err });
        console.log(err);
      } else {
        res.json({ status: "OK" });
        console.log(success);
      }
    }
  );
});

app.post("/RejectJobRequest", (req, res) => {
  Job.findOneAndUpdate(
    { _id: req.body.job_id },
    { status: "rejected" },
    function (err, success) {
      if (err) {
        res.json({ status: "error", error: err });
        console.log(err);
      } else {
        res.json({ status: "OK" });
        console.log(success);
      }
    }
  );
});

app.post("/GetAllJobsOfCompany", (req, res) => {
  Job.find({ company_id: req.body.company_id }, function (err, data) {
    if (err) {
      res.json({ status: "error", error: err });
    } else {
      res.json({ status: "ok", jobs: data });
    }
  });
});

app.post("/addStudent", (req, res) => {
  Student.exists({ email: req.body.email }, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("Result :", doc);
      if (doc) {
        res.json({ status: "ok", message: "already There" });
      } else {
        const generatePassword = (
          length = 8,
          wishlist = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$"
        ) =>
          Array.from(crypto.randomFillSync(new Uint32Array(length)))
            .map((x) => wishlist[x % wishlist.length])
            .join("");
        const newPassword = generatePassword();
        const newStudent = new Student({
          email: req.body.email,
          password: newPassword,
          appliedJobs: [],
          name: "",
          cgpa: 0,
          college_id: "",
          branch: "",
          resumeLink: "",
          linkedin_profile: "",
          codechef_profile: "",
          leetcode_profile: "",
        });

        newStudent.save();

        const mailOptions = {
          from: "harshalpamecha2000@gmail.com", //'####youremail#####',
          to: req.body.email,
          subject: "Your DDU placement account!",
          text: `Your username - ${req.body.email} Your password - ${newPassword}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        res.json({
          status: "ok",
          message: "account Created",
          password: newPassword,
        });
      }
    }
  });
});

app.post("/addStudentToJob", (req, res) => {
  Job.findOneAndUpdate(
    { _id: req.body.job_id },
    { $push: { candidates: req.body.student_email } },
    function (err, success) {
      if (err) {
        console.log(err);
      } else {
        console.log(success);
        res.json({ status: "ok" });
      }
    }
  );
});

app.post("/updateStudentProfile", (req, res) => {
  Student.findOneAndUpdate(
    { _id: req.body.student_id },
    {
      name: req.body.name,
      cgpa: req.body.cgpa,
      college_id: req.body.college_id,
      branch: req.body.branch,
      resumeLink: req.body.resumeLink,
      linkedin_profile: req.body.linkedin_profile,
      codechef_profile: req.body.codechef_profile,
      leetcode_profile: req.body.leetcode_profile,
    },
    function (err, success) {
      if (err) {
        console.log(err);
      } else {
        console.log(success);
        res.json({ status: "ok" });
      }
    }
  );
});

app.post("/getStudentData", (req, res) => {
  Student.find(
    { _id: req.body.student_id },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("getStudentData server" ,data);
        res.json({ status: "ok",student:data[0] });
      }
    }
  );
});

/* ////////////////////////////////////////////////////////////////////////////////// */

app.post("/tpoRequestedJobs", function (req, res) {
  Job.find({}, function (err, data) {
    const requestedJobs = data.filter((job) => job.status === "waiting");
    console.log("requestedJobs", requestedJobs);

    res.send({ data: requestedJobs });
    console.log(data);
  });
});

var tid;
var tname;
app.post("/setdetails", function (req, res) {
  tid = req.body.jid;
  tname = req.body.jname;
  console.log(tid, tname);
  Job.find({ _id: tid }, function (err, redfound) {
    console.log(redfound);
    console.log(redfound[0].status);
    redfound[0].status = tname;
    redfound[0].save();
  });
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});

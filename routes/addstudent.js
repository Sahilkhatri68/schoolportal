const express = require("express");
const router = express.Router();
const studentdata = require("../models/studentschema");

// code to get all students
router.get("/", async (req, res) => {
  try {
    const student = await studentdata.find();
    res.json(student);
  } catch (error) {
    console.log("Error in getting student", error);
    res.status(400).json({
      message: "Error",
      status: "Error",
    });
  }
});

// code to add student
router.post("/", async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  console.log("URL IS " + url);
  console.log(req.body);

  const student = new studentdata({
    name: req.body.name,
    class: req.body.class,
    section: req.body.section,
    age: req.body.age,
    rollnumber: req.body.rollnumber,
    password: req.body.password,
    phone: req.body.phone,
    fathersname: req.body.fathersname,
    dob: req.body.dob,
  });

  try {
    const newstudent = await student.save();
    res.status(201).json({
      message: "Student Registered",
      status: "success",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

module.exports = router;

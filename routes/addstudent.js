const express = require("express");
const router = express.Router();
const studentdata = require("../models/studentschema");

// code to get all students
router.get("/", async (req, res) => {
  try {
    const student = await studentdata.find();
    // const totalStudent = student.length;
    res.json(student);
  } catch (error) {
    console.log("Error in getting student ", error);
    res.status(400).json({
      message: "Error",
      status: "Error",
    });
  }
});

// code to get student by class
router.get("/class", async (req, res) => {
  try {
    const studentByClass = await studentdata.find().populate([
      {
        path: "class",
      },
    ]);
    res.json(studentByClass);
  } catch (error) {
    console.log("Error in getting student by class", error);
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

  const newRollNumber = Math.floor(Math.random() * 1000000000 + 1);
  const student = new studentdata({
    name: req.body.name,
    class: req.body.class,
    email: req.body.email,
    age: req.body.age,
    rollnumber: newRollNumber,
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

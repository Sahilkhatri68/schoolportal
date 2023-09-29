const express = require("express");
const router = express.Router();
const classSchema = require("../models/classSchema");

router.get("/", async (req, res) => {
  try {
    const classfind = await classSchema.find().populate([
      {
        path: "classStudents",
      },
    ]);
    res.json(classfind);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

// code to add class
router.post("/", async (req, res) => {
  console.log(req.body);
  let classIDgenerator = Math.floor(Math.random() * 10000000 + 1);
  console.log(classIDgenerator);

  const classreg = new classSchema({
    className: req.body.className,
    classID: classIDgenerator,
    classStudents: req.body.classStudents,
  });

  try {
    const newClass = await classreg.save();
    res.status(201).json({
      message: "Class created successfuly",
      class: newClass,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

module.exports = router;

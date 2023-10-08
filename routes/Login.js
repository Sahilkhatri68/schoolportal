const admin = require("../models/Admin");
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookiParser = require("cookie-parser");
require("dotenv").config();
const router = express.Router();
router.use(cookiParser());

router.post("/", async (req, res) => {
  try {
    const { adminEmail, password } = req.body;
    // console.log(req.body);
    const fetchedAdmin = await admin.findOne({ adminEmail }).lean();
    if (!fetchedAdmin)
      return res
        .status(400)
        .json({ message: "Admin Email is wrong ", status: "warning" });

    console.log("Fetched Email : " + fetchedAdmin.adminEmail);
    console.log("Fetched Password :  " + fetchedAdmin.password);

    const hash_psw = fetchedAdmin.password;

    if (!bcryptjs.compareSync(password, hash_psw))
      return res
        .status(400)
        .json({ message: "Admin Passord is wrong ", status: "warning" });

    // token
    const token = jwt.sign(
      {
        id: admin._id,
        adminEmail: admin.adminEmail,
      },
      process.env.JWT_SECRET
    );

    // cookies
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "none",
      secure: true,
    });

    // set localstorage
    res.locals.fetchedAdmin = {
      id: admin._id,
      adminEmail: admin.adminEmail,
      Headers: {
        token: token,
      },
    };

    res.status(200).json({
      message: "login success",
      status: "success",
      token: token,
      fetchedAdmin: res.locals.fetchedAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

module.exports = router;

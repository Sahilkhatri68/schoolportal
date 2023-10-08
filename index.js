const express = require("express");
const app = express();
app.use(express.json());
const PORT = 4000;
const cors = require("cors");

// code for connection with DB----
const connectDb = require("./config/dbconn");
connectDb();
// code end for connection with DB----
const allowedOrigins = [
  "http://localhost:3000",
  "https://schoolportal-frontend.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.json({
    message: "School server is running properly....",
  });
});

// api to get admin
app.use("/api/getadmin", require("./routes/AdminReg"));
// api to post admin
app.use("/api/postadmin", require("./routes/AdminReg"));

// api to admin login
app.use("/api/login", require("./routes/Login"));

// api to logout
app.use("/api/adminlogout", require("./routes/Logout"));
// api to get class
app.use("/api/getclass", require("./routes/classRoute"));
// api to add class
app.use("/api/addnewclass", require("./routes/classRoute"));
// api to get all user
app.use("/api/getallstudent", require("./routes/addstudent"));
app.use("/api/registerStudent", require("./routes/addstudent"));

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

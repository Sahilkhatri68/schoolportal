const express = require("express");
const app = express();
app.use(express.json());
const PORT = 4000;

// code for connection with DB----
const connectDb = require("./config/dbconn");
connectDb();
// code end for connection with DB----

app.get("/", (req, res) => {
  res.json({
    message: "School server is running properly....",
  });
});

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

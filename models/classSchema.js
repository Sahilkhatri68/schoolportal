const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
  className: {
    type: String,
    require: true,
  },

  classID: {
    type: Number,
  },
  classStudents: [
    {
      type: mongoose.Types.ObjectId,
      ref: "students",
    },
  ],
});
module.exports = mongoose.model("classSchema", classSchema);

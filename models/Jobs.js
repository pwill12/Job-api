const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
  {
    Img: { type: String, required: true, unique: true },
    title: { type: String, required: true, },
    Location: { type: String, required: true },
    time: { type: String},
    tag: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", JobsSchema);
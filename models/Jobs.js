const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
  {
    img: { type: String, required: true, unique: true },
    title: { type: String, required: true, },
    content: { type: String, required: true},
    location: { type: Array, required: true },
    responsibilities: { type: Array , required: false},
    qualifications: { type: Array},
    vacancy: { type: Number},
    salary: { type: Array},
    time: { type: String},
    tag: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", JobsSchema);
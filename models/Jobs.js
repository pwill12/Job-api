const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema({
    employerId: {
        type: String,
    },
    img: { type: String },
    title: { type: String },
    content: { type: String },
    location: { type: Array },
    responsibilities: { type: Array },
    qualifications: { type: Array },
    vacancy: { type: Number },
    salary: { type: Array },
    time: { type: String },
    tag: { type: Array },
}, { timestamps: true });

module.exports = mongoose.model("Jobs", JobsSchema);
const mongoose = require("mongoose");

const EmployerscandidatesSchema = new mongoose.Schema(
  {
    jobId: { type: String, unique: false },
    employerId: { type: String, unique: false },
    jobdetails: { type: String, unique: false },
    jobitems: [
      {
        user: { type: String, unique: false },
        username: { type: String, unique: false },
        email: { type: String, unique: false },
        cover: { type: String, unique: false },
        projectlinks: { type: String, unique: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Employerscandidates",
  EmployerscandidatesSchema
);

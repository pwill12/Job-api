const mongoose = require("mongoose");

const UserskillsSchema = new mongoose.Schema(
  {
    skills: { type: Array}
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserSkills", UserskillsSchema);

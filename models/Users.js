const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    img: { type: String, required: false, unique: false },
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false, unique: false },
    number: {type: Number, unique: true},
    website: {type: String},
    linkedln: {type: String, unique: true},
    github: {type: String, unique: true},
    facebook: {type: String, unique: true},
    instagram: {type: String, unique: true},
    twitter: {type: String, unique: true},
    skills: { type: Array},
    location: { type: Array, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

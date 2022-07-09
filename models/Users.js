const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    img: { type: String, required: false, unique: false },
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false, unique: false },
    number: { type: Number, required: false, unique: true },
    website: { type: String },
    linked: { type: String },
    github: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    skills: { type: Array },
    location: { type: Array, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
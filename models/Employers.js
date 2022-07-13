const mongoose = require("mongoose");

const EmployersSchema = new mongoose.Schema({
    website: { type: String, required: false },
    location: { type: Array, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false, },
    isEmployer: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Employers", EmployersSchema);
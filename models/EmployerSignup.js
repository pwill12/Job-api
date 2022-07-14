const mongoose = require("mongoose");

const EmployerSignupsSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    isEmployer: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("EmployersAuth", EmployerSignupsSchema);
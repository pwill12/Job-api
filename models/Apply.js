const mongoose = require('mongoose');

const ApplySchema = new mongoose.Schema({
    user: { type: String },
    employerId: { type: String },
    jobitems: [{
        jobs: { type: String },
        username: { type: String },
        email: { type: String },
        cover: { type: String },
        projectlinks: { type: String }
    }]
}, { timestamps: true });


module.exports = mongoose.model('Apply', ApplySchema);
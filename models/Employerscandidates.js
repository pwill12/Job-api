const mongoose = require('mongoose');

const EmployerscandidatesSchema = new mongoose.Schema({
    employerId: { type: String },
    jobitems: [{
        jobs: { type: String },
        username: { type: String },
        email: { type: String },
        cover: { type: String },
        projectlinks: { type: String }
    }]
}, { timestamps: true });


module.exports = mongoose.model('Employerscandidates', EmployerscandidatesSchema);
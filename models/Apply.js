const mongoose = require('mongoose');

const ApplySchema = new mongoose.Schema({
    user: {type: String},
    jobitems: [
        {
            jobs: {type: String, required: true},
            username: { type: String, required: true},
            email: { type: String, required: true},
            projectlinks: { type: String, required: true}
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('Apply', ApplySchema);
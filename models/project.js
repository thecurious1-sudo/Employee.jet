const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    team: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
    },
    finishedAt: {
        type: Date,
        default: null
    },
    feedback: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback',
    }]
}, {   
    timestamps: true

});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
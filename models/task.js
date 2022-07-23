const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }
} , {
    timestamps: true
});

const Task = mongoose.model('Task' , taskSchema);

module.exports = Task;
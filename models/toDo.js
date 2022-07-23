const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    assignedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    tasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
} ,{
    timestamps: true
});

const ToDo = mongoose.model('ToDo' , toDoSchema);

module.exports = ToDo;
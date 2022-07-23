const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedBy:{
        type: mongoose.Schema.Types.ObjectId.apply,
        ref: 'User',
        required: true,
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
const mongoose = require(`mongoose`);
const ToDo = require(`../models/toDo`);
// For uploading files
const multer = require(`multer`);
const path = require(`path`);
const AVATAR_PATH =path.join(`/uploads/users/avatars`);
let storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null , path.join(__dirname , `..` , AVATAR_PATH));
    }, filename: function(req , file , cb){
        cb(null , file.fieldname+`-`+Date.now());
    }
});

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    empId: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: Number,
        required: true
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    address: {
        type: String,
        required: true
    },
    phnNo: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    joinedOn: {
        type: Date,
        required: true,
    },
    releasedOn: {
        type: Date,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `Project`
    }],
    pvtToDoList :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ToDo',
        default: null
    },
    projectsToDoList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ToDo',
        default: null
    },
    feedback: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback',
    }]
} , {
    // Keep the created and updated time
    timestamps: true
});

// Creating static functions
userSchema.statics.uploadAvatar = multer({storage: storage}).single(`avatar`); //.single(``) implies that only a single file will uploaded for the field name avatar
userSchema.statics.avatarPath = AVATAR_PATH;  //We made AVATAR_PATH global

const User = mongoose.model(`User` , userSchema);

module.exports = User;
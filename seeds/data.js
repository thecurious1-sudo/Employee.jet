const mongoose = require('mongoose');
const User=require('../models/user');

module.exports.users = [
    {
        name: "John Doe",
        designation: "CEO",
        empId: "1",
        level: 1,
        supervisor: null,
        address: "Bangalore",
        phnNo: "+91 1234567890",
        email: "johndoe@empjet.ac.in",
        joinedOn: new Date(),   
        releasedOn: null,
        password: "123456",
        avatar: "./uploads/users/avatars/avatar-1.jpeg",
        projects: []
    },
    {
        name: "Jane Doe",
        designation: "Manager",
        empId: "2",
        level: 2,
        supervisor: null,
        address: "Bangalore",
        phnNo: "+91 932193291",
        email: "janedoe@empjet.ac.in",
        joinedOn: new Date(),
        releasedOn: null,
        password: "123456",
        avatar: "./uploads/users/avatars/avatar-1.jpeg",
        projects: []
    },
    {
        name: "Hugh Doe",
        designation: "Manager",
        empId: "3",
        level: 2,
        supervisor: null,
        address: "Bangalore",
        phnNo: "+91 928383212",
        email: "hughdoe@empjet.ac.in",
        joinedOn: new Date(),
        releasedOn: null,
        password: "123456",
        avatar: "./uploads/users/avatars/avatar-1.jpeg",
        projects: []
    },
    {
        name: "Jack Doe",
        designation: "Employee",
        empId: "4",
        level: 3,
        supervisor: null,
        address: "Bangalore",
        phnNo: "+91 928383212",
        email: "jackdoe@empjet.ac.in",
        joinedOn: new Date(),
        releasedOn: null,
        password: "123456",
        avatar: "./uploads/users/avatars/avatar-1.jpeg",
        projects: []
    },
    {
        name: "Jill Doe",
        designation: "Employee",
        empId: "5",
        level: 3,
        supervisor: null,
        address: "Bangalore",
        phnNo: "+91 928383212",
        email: "jilldoe@empjet.ac.in",
        joinedOn: new Date(),
        releasedOn: null,
        password: "123456",
        avatar: "./uploads/users/avatars/avatar-1.jpeg",
        projects: []
    },
    {
        name: "Samarth Doe",
        designation: "Employee",
        empId: "6",
        level: 3,
        supervisor: null,
        address: "Bangalore",
        phnNo: "+91 928383212",
        email: "samdoe@empjet.ac.in",
        joinedOn: new Date(),
        releasedOn: null,
        password: "123456",
        avatar: "./uploads/users/avatars/avatar-1.jpeg",
        projects: []
    },
]

module.exports.todoDataPvt = [
    {
        task: "Task 1",
        endDate: new Date(),
        deadline: new Date(),
    },
    {
        task: "Task 2",
        endDate: new Date(),
        deadline: new Date(),
    },
    {
        task: "Task 3",
        endDate: new Date(),
        deadline: new Date(),
    }
]

const getId = async(empId) => {
    const res = await User.findOne({ empId: empId });
    return res._id;
  }
module.exports.returnProjects = async () => {
    return [
        {
            name: "Project 1",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda expedita maxime mollitia eos neque possimus aspernatur reprehenderit vero harum suscipit nesciunt, blanditiis, similique, quia veniam consectetur! Velit culpa corrupti nihil!",
            supervisor: await getId("1"),
            team: [
                await getId("2"),
                await getId("3"),
            ],
        },
        {
            name: "Project 2",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda expedita maxime mollitia eos neque possimus aspernatur reprehenderit vero harum suscipit nesciunt, blanditiis, similique, quia veniam consectetur! Velit culpa corrupti nihil!",
            supervisor: await getId("2"),
            team: [
                await getId("4"),
                await getId("5"),],
        }
    ]
}

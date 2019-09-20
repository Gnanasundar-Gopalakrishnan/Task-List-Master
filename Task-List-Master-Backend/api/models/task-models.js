const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    taskID:String,
    taskList:String,
    departmentName: String,
    serviceType:String,
    skill: String,
    role: String,

});

module.exports = mongoose.model('Task' , taskSchema );
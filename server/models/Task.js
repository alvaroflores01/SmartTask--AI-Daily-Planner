const mongoose = require('mongoose');

//Create schema for the Task
const TaskSchema = new mongoose.Schema( {
    user_id: {type:String, required: true},
    task_text: String,
    completed: {type: Boolean, default: false},
}, {timestamps: {createdAt: 'created_at'}});

//Assign the schema to the TaskModel
const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;
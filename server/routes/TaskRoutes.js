const express = require('express');
const TaskModel = require("../models/Task")
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { task, id } = req.body;
        const newTask = await TaskModel.create({task_text:task, user_id: id})
        if (newTask) {
            console.log("New Task Created");
        }        
        
    } catch (error) {
        throw error.message;
    }
})

router.put('/:id', async(req, res) => {
    const { completed } = req.body
    await TaskModel.updateOne( {_id: req.params.id}, {completed: completed})
    res.status(200).send('updated task')
})

router.delete('/:id', async (req, res) => {
    const taskId = req.params.id;
    response = await TaskModel.deleteOne( { _id: taskId })
    res.status(200).send("Deleted task successfully.")
})

module.exports = router;
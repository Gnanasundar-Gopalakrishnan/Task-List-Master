const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task-models')

router.get('/', (req, res, next) => {
    Task.find().exec().then(docs => {
        console.log("All the records ", docs);
        res.status(200).json(docs);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        taskID: req.body.taskID,
        taskList: req.body.taskList,
        departmentName: req.body.departmentName,
        serviceType:req.body.serviceType,
        skill:req.body.skill,
        role: req.body.role
    });
    task.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling post request from task',
            createdTask: result
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:taskId', (req, res, next) => {
    const id = req.params.aircraftId;
    Task.findById(id).exec()
        .then(doc => {
            console.log("From Database", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: 'No valid entry provided for the ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    const updateOps ={};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
      }
    // second parameter - update list
    Task.update({_id:id}, {$set : updateOps}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
});

router.delete('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    Task.remove({ _id: id }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;
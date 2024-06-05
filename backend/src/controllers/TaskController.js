const Task = require('../models/Entities/TaskEntity');
const User = require("../models/Entities/UserEntity");
const Enterprise = require("../models/Entities/EnterpriseEntity");

const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

class TaskController {
    constructor() {

    }

    async createTask(req, res, next) {
        const errors = validationResult(req);
        if (errors.isEmpty())
            return res.status(400).json({ error: errors.array() });

        try {
            const { name, priority, enterprise, owner, signedTo, status, requirement } = req.body;

            const enterpriseData = await Enterprise.findOne({ externalID: enterprise });
            if (!enterpriseData)
                return res.status(400).send({ error: `Enterprise ${enterprise} is invalid` });
            else if (enterpriseData.Blocked)
                return res.status(400).send({ error: `Enterprise ${enterprise} is Blocked` });

            const ownerUser = await User.findOne({ externalID: owner });
            if (!ownerUser)
                return res.status(400).send({ error: `User Owner ${owner} is invalid` });
            else if (ownerUser.blocked)
                return res.status(400).send({ error: `User Owner ${owner} is blocked` });

            if (signedTo) {
                const signedUser = await User.findOne({ externalID: signedTo });
                if (!signedUser)
                    return res.status(400).send({ error: `User Signed ${signedTo} is invalid` });
                else if (signedUser.blocked)
                    return res.status(400).send({ error: `User Signed ${signedTo} is blocked` });
            }

            const newTask = new Task({
                externalID: uuidv4(),
                name,
                priority,
                enterpriseData,
                ownerUser,
                signedTo,
                status,
                requirement
            });

            await newTask.save();

            res.status(201).send(newTask);
            return next();
        }
        catch (err) {
            return res.status(500).send({ error: err.message });
        }
    }

    async getTask(req, res, next){
        try{
            if(!req.params.id)
                return res.status(400).send({ error: `Invalid ID` });

            const task = await Task.findById(req.params.id).populate({ path: "owner", populate: "user", strictPopulate: false }, { path: "enterprise", populate: "enterprise", strictPopulate: false });

            if(!task)
                return res.status(404).send({ error: 'Task not found'});

            res.status(200).send(task);
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message });
        }
    }

    async getTaskExternal(req, res, next){
        try{
            if(!req.params.id)
                return res.status(400).send({ error: "Invalid ID"});

            const task = await Task.findOne({ externalID: req.params.id}).populate('enterprise user');

            if(!task)
                return res.status(404).send({error: "Task not found"});

            res.status(200).send(task);
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message });
        }
    }

    async getTasksByUser(req, res, next){
        try{
            if(!req.params.id)
                return res.status(400).send({ error: "UserID invalid"});

            const user = await User.findOne({ externalID: req.params.id});
            if(!user)
                return res.status(404).send({ error: "User not found"});

            const listTasks = await Task.find({ owner: user._id }).populate([{ path: "user", strictPopulate: false }, { path: "enterprise", strictPopulate: false }]);

            res.status(200).send({
                isSuccess: true,
                status: 200,
                data: listTasks
            });
            return next();
        }
        catch(err){
            return res.status(500).send({error: err.message });
        }
    }

    async updateTask(req, res, next){
        const errors = validationResult(req);
        if (errors.isEmpty())
            return res.status(400).json({ error: errors.array() });

        try{
            const _id = req.params.id;

            const update = req.body;

            const task = await Task.findOneAndUpdate(_id, update, { new: true}).populate('user enterprise');

            if(!task)
                return res.status(404).send({ error: "Task not found" });

            res.status(200).send(task);
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message });
        }
    }

    async deleteTask(req, res, next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const task = await Task.findByIdAndDelete(req.params.id);
            if(!task)
                return res.status(404).send({ error: "Task not found"});

            res.send(user);
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message});
        }
    }
}

module.exports = new TaskController();
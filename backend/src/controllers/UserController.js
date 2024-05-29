const User = require("../models/Entities/UserEntity");
const Role = require("../models/Entities/RoleEntity");
const Enterprise = require("../models/Entities/EnterpriseEntity");

const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

class UserController{
    async createUser(req, res, next) {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try{
            const { name, email, password, roles, enterprise = [] } = req.body;

            const roleIds = await Role.find({ _id: { $in: roles }}).select('_id');
            console.log("ROLEIDs => ", roleIds );

            const enterpriseIds =  await Enterprise.find({ _id: { $in: enterprise}}).select('_id');
            console.log("enterpriseIds => ", enterpriseIds);

            const user = new User({
                _externalID: uuidv4(),
                name,
                email,
                password,
                roles: roleIds.map(role => role._id),
                enterprises: enterpriseIds.map(enterprise => enterprise._id)
            });
            console.log("user => ", user);

            await user.save();

            await Enterprise.updateMany(
                { _id: { $in: enterprises } },
                { $addToSet: { users: user._id } }
            );
            res.status(201).send(user);

            return next();
        }
        catch(err) {
            return res.status(500).send({ error: error.message});
        }
    }

    async getUser(req, res, next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const user = await User.findById(req.params.id).populate('roles enterprise');

            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }
            res.status(200).send(user);
            return next();
        }
        catch(error){
            return res.status(500).send({ error: error.message });
        }
    }

    async getAllUsers(req, res, next){
        try{
            const users = await User.find().populate('roles enterprises');
            res.send(users);
            return next();
        }
        catch(error) {
            return res.status(500).send({ error: error.message });
        }
    }

    async updateUser(req, res, next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const updates = req.body;
            const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true})
                                .populate('roles enterprises');

            if(!user)
                return res.status(404).send({ error: 'User not found'});

            if(updates.roles){
                const roleIds = await Role.find({ _id: { $in: updates.roles }}).select("_id");
                user.roles = roleIds.map(role => role._id);
            }

            if(updates.enterprises){
                const enterpriseIds = await Enterprise.find({ _id: { $in: updates.enterprises } }).select('_id');
                user.enterprises = enterpriseIds.map(enterprise => enterprise._id);

                // Update enterprises with the user
                await Enterprise.updateMany(
                    { _id: { $in: updates.enterprises } },
                    { $addToSet: { users: user._id } }
                );
            }

            await user.save();
            res.status(200).send(user);
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message });
        }
    }

    async deleteUser(req, res, next){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const user = await User.findByIdAndDelete(req.params.id);
            if(!user)
                return res.status(404).send({ error: "User not found"});

            await Enterprise.updateMany(
                { users: user._id },
                { $pull: { users: user._id } }
            );

            res.send(user);
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message});
        }
    }
}

module.exports = new UserController();
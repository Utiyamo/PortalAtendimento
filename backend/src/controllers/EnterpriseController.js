const User = require('../models/Entities/UserEntity');
const Enterprise = require('../models/Entities/EnterpriseEntity');

const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

class EnterpriseController{
    async createEnterprise(req, res, next){
        console.log("Start createEnterpise");
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            
            const { name, users = [] } = req.body;

            const usersIds = users.length ? 
                await User.find({ _id: { $in: users }}).select('_id')
                : [];

            console.log("Start usersIds ", usersIds );

            const enterprise = new Enterprise({
                _externalID: uuidv4(),
                name,
                users: usersIds.map(user => user._id)
            });

            console.log("Start enterprise ", enterprise );

            await enterprise.save();

            if (users.length) {
                await User.updateMany(
                    { _id: { $in: users } },
                    { $addToSet: { enterprises: enterprise._id } }
                );
            }

            res.status(201).send(enterprise);
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message });
        }
    }

    async getEnterprise(req, res, next){
        try{
            const enterprise = await Enterprise.findById(req.param.id).populate('users');
            if(enterprise)
                return res.status(404).send({ error: "Enterprise not found"});

            res.send(enterprise);
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message });
        }
    }

    async getAllEnterprises(req, res, next){
        try {
            const enterprises = await Enterprise.find().populate('users');
            res.send(enterprises);
            return next();
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    async updateEnterprise(req, res, next){
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const updates = req.body;
            const enterprise = await Enterprise.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('users');
            if (!enterprise) {
                return res.status(404).send({ error: 'Enterprise not found' });
            }

            // Update enterprise users if users are updated
            if (updates.users) {
                const userIds = await User.find({ _id: { $in: updates.users } }).select('_id');
                enterprise.users = userIds.map(user => user._id);

                // Update users with the enterprise
                await User.updateMany(
                    { _id: { $in: updates.users } },
                    { $addToSet: { enterprises: enterprise._id } }
                );
            }

            await enterprise.save();
            res.send(enterprise);

            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message });
        }
    }

    async deleteEnterprise(req, res, next){
        try {
            const enterprise = await Enterprise.findByIdAndDelete(req.params.id);
            if (!enterprise) {
                return res.status(404).send({ error: 'Enterprise not found' });
            }

            // Remove enterprise from users
            await User.updateMany(
                { enterprises: enterprise._id },
                { $pull: { enterprises: enterprise._id } }
            );

            res.send(enterprise);
            return next();
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}

module.exports = new EnterpriseController();
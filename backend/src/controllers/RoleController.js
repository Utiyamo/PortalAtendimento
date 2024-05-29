const Role = require('../models/Entities/RoleEntity');
const User = require('../models/Entities/UserEntity');

class RoleController {
    async createRole(req, res, next){
        try{
            const { name, permissions } = req.body;

            const role = new Role({
                name,
                permissions
            });

            await role.save();

            res.status(201).send(role);
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message });
        }
    }

    async getRole(req, res, next){
        try{
            const role = await Role.findById(req.params.id);
            if(!role)
                return res.status(404).send({ error: "Role not found "});

            res.send(role);
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message });
        }
    }
    
    async getAllRoles(req, res, next){
        try {
            const roles = await Role.find();
            res.send(roles);
            return next();
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    async updateRole(req, res) {
        try {
            const updates = req.body;
            const role = await Role.findByIdAndUpdate(req.params.id, updates, { new: true });
            if (!role) {
                return res.status(404).send({ error: 'Role not found' });
            }
            res.send(role);
            return next();
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async deleteRole(req, res) {
        try {
            const role = await Role.findById(req.params.id);
            if (!role) {
                return res.status(404).send({ error: 'Role not found' });
            }

            // Remove the role from users
            await User.updateMany(
                { roles: role._id },
                { $pull: { roles: role._id } }
            );

            // Delete the role
            await Role.findByIdAndDelete(role._id);

            res.send(role);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = new RoleController();
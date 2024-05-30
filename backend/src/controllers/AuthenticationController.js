const bcrypt = require('bcryptjs');

const User = require('../models/Entities/UserEntity');
const Role = require('../models/Entities/RoleEntity');
const Enterprise = require('../models/Entities/EnterpriseEntity');

const { generateToken } = require('../middleware/authenticator');

class AuthController{

    async login(req, res, next){
        const { email, password } = req.body;

        try{
            const user = await User.findOne({ email });

            if(!user)
                return res.status(404).send({ error: "Invalid E-mail or Password"});

            const roles = await Role.find({ _id: { $in: user.roles }});
            const enterprises =  await Enterprise.find({ _id: { $in: user.enterprises}});

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch)
                return res.status(401).send({ error: "invalid E-mail or Password"});

            const token = generateToken(user);
            res.send({ 
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._externalID,
                    roles: roles,
                    enterprises: enterprises
                },
                token: token
             });
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message });
        }
    }
}

module.exports = new AuthController();
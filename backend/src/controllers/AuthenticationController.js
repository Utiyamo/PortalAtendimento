const bcrypt = require('bcryptjs');

const User = require('../models/Entities/UserEntity');

const { generateToken } = require('../middleware/authenticator');

class AuthController{

    async login(req, res, next){
        const { email, password } = req.body;

        try{
            const user = await User.findOne({ email });

            if(!user)
                return res.status(404).send({ error: "Invalid E-mail or Password"});

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch)
                return res.status(401).send({ error: "invalid E-mail or Password"});

            const token = generateToken(user);
            res.send({ token });
            return next();
        }
        catch(err){
            return res.status(500).send({ error: err.message });
        }
    }
}

module.exports = new AuthController();
const User = require('../models/Entities/UserEntity');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class AuthorizeModule {
    constructor(requiredPermissions){
        this.requiredPermissions = requiredPermissions;
    }

    async authorize(req, res, next){
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).send({ error: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
            req.user = decoded;

            const user = await User.findById(req.user.id).populate('roles');

            if (!user) {
                return res.status(401).send({ error: 'User not found' });
            }

            const userPermissions = user.roles.flatMap(role => role.permissions);
            const hasPermission = this.requiredPermissions.every(permission => userPermissions.includes(permission));

            if (!hasPermission) {
                return res.status(403).send({ error: 'Forbidden Access' });
            }

            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).send({ error: 'Token expired' });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).send({ error: 'Invalid token' });
            }
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
    
    static init(requiredPermissions) {
        const instance = new AuthorizeModule(requiredPermissions);
        return instance.authorize.bind(instance);
    }
}

module.exports = AuthorizeModule;
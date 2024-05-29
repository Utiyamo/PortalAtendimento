const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';

const authenticateJWT = expressJwt({
    secret,
    algorithms: ['HS256'],
    credentialsRequired: true,
    getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        return null;
    },
});

const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
    };

    return jwt.sign(payload, secret, { expiresIn: '1h' });
};

module.exports = {
    authenticateJWT,
    generateToken,
};
const { check } = require('express-validator');

exports.validateUser = [
    check("name").notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isString().withMessage('Valid password is required'),
    check('roles').isArray().withMessage('Roles must be an array'),
    check('enterprises').isArray().withMessage('Enterprises must be an array'),
];
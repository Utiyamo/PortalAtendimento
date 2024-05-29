const { check } = require('express-validator');

exports.validateEnterprise = [
    check('name').notEmpty().withMessage('Name is required'),
    check('users').optional().isArray().withMessage('Users must be an array if provided'),
];
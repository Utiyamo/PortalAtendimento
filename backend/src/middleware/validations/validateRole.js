const { check } = require('express-validator');

exports.validateRole = [
    check('name').notEmpty().withMessage('Name is required'),
    check('permissions').isArray().withMessage('Permissions must be an array'),
];
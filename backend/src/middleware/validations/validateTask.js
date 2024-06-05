const { check } = require('express-validator');

exports.validateTask = [
    check("name").notEmpty().withMessage('Name is required'),
    check("priority").notEmpty().isNumeric().withMessage('priority is required'),
    check("enterprise").notEmpty().withMessage('enterprise is required'),
    check("owner").notEmpty().withMessage('owner is required'),
    check("requirement").notEmpty().withMessage('requirement is required'),
];
const express = require("express");

const authController = require('../controllers/AuthenticationController');
const userController = require("../controllers/UserController");
const enterpriseController = require('../controllers/EnterpriseController');
const roleController = require("../controllers/RoleController");

const AuthorizeModule = require('../middleware/authorize');
const { authenticateJWT } = require('../middleware/authenticator');

const { validateUser } = require('../middleware/validations/validateUser');
const { validateEnterprise } = require('../middleware/validations/validateEnterprise');
const { validateRole } = require('../middleware/validations/validateRole');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send("Hello World");
    return next();
});

router.post('/auth', authController.login);

//User
router.post('/users', validateUser, authenticateJWT, AuthorizeModule.init(['create_user']), userController.createUser);
router.get('/users/:id',authenticateJWT, AuthorizeModule.init(['read_user']), userController.getUser);
router.get('/users',authenticateJWT, AuthorizeModule.init(['read_user']), userController.getAllUsers);
router.put('/users/:id', validateUser, authenticateJWT, AuthorizeModule.init(['update_user']), userController.updateUser);
router.delete('/users/:id',authenticateJWT, AuthorizeModule.init(['delete_user']), userController.deleteUser);

// Enterprise routes
router.post('/enterprises',validateEnterprise, authenticateJWT, AuthorizeModule.init(['manage_enterprises']), enterpriseController.createEnterprise);
router.get('/enterprises/:id',authenticateJWT, AuthorizeModule.init(['read_enterprises']), enterpriseController.getEnterprise);
router.get('/enterprises',authenticateJWT, AuthorizeModule.init(['read_enterprises']), enterpriseController.getAllEnterprises);
router.put('/enterprises/:id', validateEnterprise, authenticateJWT, AuthorizeModule.init(['manage_enterprises']), enterpriseController.updateEnterprise);
router.delete('/enterprises/:id',authenticateJWT, AuthorizeModule.init(['manage_enterprises']), enterpriseController.deleteEnterprise);

router.post('/roles', validateRole, authenticateJWT, AuthorizeModule.init(['create_role']), roleController.createRole);
router.get('/roles/:id',authenticateJWT, AuthorizeModule.init(['read_role']), roleController.getRole);
router.get('/roles',authenticateJWT, AuthorizeModule.init(['read_role']), roleController.getAllRoles);
router.put('/roles/:id', authenticateJWT,AuthorizeModule.init(['update_role']), validateRole, roleController.updateRole);
router.delete('/roles/:id',authenticateJWT, AuthorizeModule.init(['delete_role']), roleController.deleteRole);

module.exports = router;
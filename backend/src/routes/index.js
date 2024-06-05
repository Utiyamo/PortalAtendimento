const express = require("express");

const authController = require('../controllers/AuthenticationController');
const userController = require("../controllers/UserController");
const enterpriseController = require('../controllers/EnterpriseController');
const roleController = require("../controllers/RoleController");
const taskController = require('../controllers/TaskController');

const AuthorizeModule = require('../middleware/authorize');
const { authenticateJWT } = require('../middleware/authenticator');

const { validateUser } = require('../middleware/validations/validateUser');
const { validateEnterprise } = require('../middleware/validations/validateEnterprise');
const { validateRole } = require('../middleware/validations/validateRole');
const { validateTask } = require("../middleware/validations/validateTask");

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send("Hello World");
    return next();
});

router.post('/auth', authController.login);

//User
router.post('/users', validateUser, AuthorizeModule.init(['create_user']), userController.createUser);
router.get('/users/:id', AuthorizeModule.init(['read_user']), userController.getUser);
router.get('/users/external/:id', AuthorizeModule.init(['read_user']), userController.getUserExternal);
router.get('/users', AuthorizeModule.init(['read_user']), userController.getAllUsers);
router.put('/users/:id', validateUser, AuthorizeModule.init(['update_user']), userController.updateUser);
router.delete('/users/:id', AuthorizeModule.init(['delete_user']), userController.deleteUser);

// Enterprise routes
router.post('/enterprises',validateEnterprise,  enterpriseController.createEnterprise);
router.get('/enterprises/:id', enterpriseController.getEnterprise);
router.get('/enterprises', enterpriseController.getAllEnterprises);
router.put('/enterprises/:id', validateEnterprise, enterpriseController.updateEnterprise);
router.patch('/enterprises/:id', enterpriseController.insertUser);
router.delete('/enterprises/:id', enterpriseController.deleteEnterprise);

//Roles routes
router.post('/roles', validateRole,  AuthorizeModule.init(['create_role']), roleController.createRole);
router.get('/roles/:id', AuthorizeModule.init(['read_role']), roleController.getRole);
router.get('/roles', AuthorizeModule.init(['read_role']), roleController.getAllRoles);
router.put('/roles/:id', validateRole, AuthorizeModule.init(['update_role']), validateRole, roleController.updateRole);
router.delete('/roles/:id', AuthorizeModule.init(['delete_role']), roleController.deleteRole);

//Tasks Routes
router.post('/task', validateTask, AuthorizeModule.init(['create_task']), taskController.createTask );
router.get('/task/:id', AuthorizeModule.init(['read_task']), taskController.getTask);
router.get('/task/external/:id', AuthorizeModule.init(['read_task']), taskController.getTaskExternal); 
router.get('/task/user/:id', AuthorizeModule.init(['read_task']), taskController.getTasksByUser);
router.put('/task/:id', validateTask,  AuthorizeModule.init(['update_task']), taskController.updateTask);


module.exports = router;
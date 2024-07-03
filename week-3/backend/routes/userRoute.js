const router = require('express').Router();
const userController = require('../controllers/userController');
const middlewareController = require('../middleware/middlewareController');
router.get('/', middlewareController.verifyToken ,userController.getAllUser); // get all users

router.get("/:id", middlewareController.verifyToken,userController.getUserById); // get user by id

router.post("/", middlewareController.verifyToken,  userController.createUser); // create a new user

router.put("/:id", middlewareController.verifyToken, userController.updateUser);  // update user by id

router.delete("/:id", middlewareController.verifyToken,userController.deleteUser);   // delete user by id

router.get("/:id/boards",middlewareController.verifyToken, userController.getUserBoards); // get all boards that the user have
module.exports = router;
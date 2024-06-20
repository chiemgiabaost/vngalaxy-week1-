const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUser);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);  

router.delete("/:id", userController.deleteUser);   
module.exports = router;
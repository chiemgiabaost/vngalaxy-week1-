const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUser);


module.exports = router;
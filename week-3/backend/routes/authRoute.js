const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser); // register a new user

router.post('/login', authController.loginUser)

router.get('/logout', authController.logoutUser); // logout a user

router.post('/refresh', authController.requestRefreshToken); // refresh token


module.exports = router;
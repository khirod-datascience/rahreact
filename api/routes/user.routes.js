const { Router } = require('express');
const { userController } = require('../controllers');
const auth = require('../middleware/auth');
const router = Router();

// @route  GET: /api/user/isLoggedIn
router.get('/isLoggedIn', auth, userController.isLoggedIn);

// @route GET: /api/user/isEmail/:email
router.get('/isEmail/:email', userController.isEmail);

// @route  POST: /api/user/signup
router.post('/signup', userController.signup);

// @route  POST: /api/user/login
router.post('/login', userController.login);

// @route  GET: /api/user/logout
router.get('/logout', userController.logout);

module.exports = router;

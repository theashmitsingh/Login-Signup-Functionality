const express = require('express');
const router = express.Router();

const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');
const { signup, login } = require('../controllers/AuthController');


router.post ("/login", loginValidation, login);
router.post ("/signup", signupValidation, signup);

module.exports = router;
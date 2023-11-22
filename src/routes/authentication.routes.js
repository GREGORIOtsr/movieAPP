const express = require('express');
const passport = require('passport');
const router = express.Router();
require('../config/jwt.config')(passport);

//Rutas únicas de autenticación
const login = require("../controllers/controllers.views/login.controller");
const signup = require("../controllers/controllers.views/signup.controller");
const auth = require('../controllers/auth.controller');


router.get('/signup', signup.homeSignup);
router.post('/signup', auth.signUpUser);
router.get('/login', login.gethomeLogin);
router.post('/login', auth.loginUser);
router.get('/logout', auth.signOut);

module.exports = router;



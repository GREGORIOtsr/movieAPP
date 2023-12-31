const express = require('express');
const passport = require('passport');
const router = express.Router();
require('../config/jwt.config')(passport);

//Rutas únicas de autenticación
const signup =require('../controllers/controllers.views/signup.controller')
const login = require('../controllers/controllers.views/login.controller')
const auth = require('../controllers/auth.controller');

router.get('/signup', signup.homeSignup);
router.post('/signup', auth.signUpUser);
router.get('/', login.gethomeLogin);
router.post('/login', auth.loginUser);
router.get('/logout', auth.signOut);
router.post('/recoverpassword', auth.recoverPassword);
router.put('/resetpassword/:token', auth.resetPassword);

module.exports = router;

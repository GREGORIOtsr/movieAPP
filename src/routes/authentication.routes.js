const express = require('express');
const router = express.Router();

//Rutas únicas de autenticación
const login = require("../controllers/controllers.views/login.controller");
const signup = require("../controllers/controllers.views/signup.controller");


// router.post('/signup', signup);
// router.post('/login', login);

module.exports = router
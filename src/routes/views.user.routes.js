const express = require('express');
const router = express.Router();

//Variables con ubicación de los controllers de views:
const dashboardUser = require("../controllers/controllers.views/dashboardUser.controller");
const favMovies = require("../controllers/controllers.views/moviesFavsUser.controller");
const searchUser = require("../controllers/controllers.views/searchUser.controller");
const searchForTitleUser = require("../controllers/controllers.views/searchForTitleUser.controller");
const login = require("../controllers/controllers.views/login.controller");
const signup = require("../controllers/controllers.views/signup.controller");

//CRUD rutas
router.get('/dashboard', dashboardUser);
router.get('/search', searchUser );
router.get('/search/title', searchForTitleUser);
router.get('/movies', favMovies);
router.post('/signup', signup);
router.post('/login', signup);
//Pendiente el post de logout (router.post('/logout', signup));
//Pendiente el get de /recoverpassword 
//Pendiente el get de /restorepassword

module.exports = router
const express = require('express');
const router = express.Router();

//Variables con ubicación de los controllers de views:
const dashboardAdmin = require("../controllers/controllers.views/dashboardAdmin.controller");
const createMovie = require("../controllers/controllers.views/createMovieAdmin.controller");
const editMovie = require("../controllers/controllers.views/editMovieAdmin.controller");
const login = require("../controllers/controllers.views/login.controller");
const signup = require("../controllers/controllers.views/signup.controller");
const removeMovie = require("../controllers/removeMovieAdmin.controller");

//CRUD rutas
router.post('/signup', signup );
router.post('/login', login);
// Falta dashboard de admin: router.get('', dashboardAdmin)
router.get('/recoverpassword', login)
router.get('/restorepassword', login)
router.delete('/removeMovie', removeMovie)
router.post('/createMovie', createMovie);
router.put('/editMovie/:id', editMovie);

//Pendiente el post de logout (router.post('/logout', signup));

module.exports = router
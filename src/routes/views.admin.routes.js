const express = require('express');
const router = express.Router();
const controllerBasePath = "../controllers/controllers.views"
const verifyToken = require('../middlewares/verifyToken');

//Hacer destructuring para acotar estas líneas
//Variables con ubicación de los controllers de views:
const dashboardAdmin = require(controllerBasePath + "/dashboardAdmin.controller");
const createMovie = require(controllerBasePath + "/createMovie.controller");
const editMovie = require(controllerBasePath + "/editMovie.controller");

// const removeMovie = require("../controllers/removeMovieAdmin.controller");

//CRUD rutas
// Falta dashboard de admin: router.get('', dashboardAdmin)
// router.get('/recoverpassword', login)
// router.get('/restorepassword', login)
router.get('/dashboardAdmin', verifyToken, dashboardAdmin.getDashboardAdmin)
router.get('/createmovie', verifyToken, createMovie.createMovieAdmin)
// router.delete('/removeMovie', removeMovie)
router.get('/editmovie', verifyToken, editMovie.editMovie);

//Pendiente el post de logout (router.post('/logout', signup));

module.exports = router
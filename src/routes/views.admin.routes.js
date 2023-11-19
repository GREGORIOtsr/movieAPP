const express = require('express');
const router = express.Router();
const controllerBasePath = "../controllers/controllers.views"

//Hacer destructuring para acotar estas líneas
//Variables con ubicación de los controllers de views:
const dashboardAdmin = require(controllerBasePath + "/dashboardAdmin.controller");
const createMovie = require(controllerBasePath + "/createMovieAdmin.controller");
const editMovie = require(controllerBasePath + "/editMovieAdmin.controller");

const removeMovie = require("../controllers/removeMovieAdmin.controller");

//CRUD rutas
// Falta dashboard de admin: router.get('', dashboardAdmin)
router.get('/recoverpassword', login)
router.get('/restorepassword', login)
router.delete('/removeMovie', removeMovie)
router.post('/createMovie', createMovie);
router.put('/editMovie/:id', editMovie);

//Pendiente el post de logout (router.post('/logout', signup));

module.exports = router
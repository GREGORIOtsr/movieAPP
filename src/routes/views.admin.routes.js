const express = require('express');
const router = express.Router();
const controllerBasePath = "../controllers/controllers.views"
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

//Hacer destructuring para acotar estas líneas
//Variables con ubicación de los controllers de views:
const dashboardAdmin = require(controllerBasePath + "/dashboardAdmin.controller");
const createMovie = require(controllerBasePath + "/createMovie.controller");
const editMovie = require(controllerBasePath + "/editMovie.controller");
const searchAdmin = require(controllerBasePath + "/searchAdmin.controller");

// const removeMovie = require("../controllers/removeMovieAdmin.controller");

//CRUD rutas
// Falta dashboard de admin: router.get('', dashboardAdmin)
// router.get('/recoverpassword', login)
// router.get('/restorepassword', login)

router.get('/dashboardAdmin', dashboardAdmin.getDashboardAdmin)
router.get('/createmovie', createMovie.createMovieAdmin)
router.get('/searchadmin', searchAdmin.getSearchAdmin)
router.get('/editmovie', editMovie.editMovie);


// router.delete('/removeMovie', removeMovie)


module.exports = router
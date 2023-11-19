const express = require('express');
const router = express.Router();
const controllerBasePath = "../controllers/controllers.views"

  
//Variables con ubicación de los controllers de views:
const dashboardUser = require(controllerBasePath + "/dashboardUser.controller");
const favMovies = require(controllerBasePath + "/moviesFavsUser.controller");
const searchUser = require(controllerBasePath + "/searchUser.controller");
const searchForTitleUser = require(controllerBasePath + "/searchForTitleUser.controller");

//singup y login tienen que ser únicas
//CRUD rutas
router.get('/dashboard', dashboardUser.getDashboardUser);
router.get('/movies', favMovies.getFavMoviesUser);
router.get('/search', searchUser.getSearchUser );
router.get('/search/:title', searchForTitleUser.getSearchTitleUser);

//Pendiente el post de logout (router.post('/logout', signup));
//Pendiente el get de /recoverpassword 
//Pendiente el get de /restorepassword

module.exports = router


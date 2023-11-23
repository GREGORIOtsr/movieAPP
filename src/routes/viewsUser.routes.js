const express = require('express');
const passport = require('passport');
const router = express.Router();
const controllerBasePath = "../controllers/controllers.views"
const verifyToken = require('../middlewares/verifyToken');

  
//Variables con ubicación de los controllers de views:
const dashboardUser = require(controllerBasePath + "/dashboardUser.controller");
const favMovies = require(controllerBasePath + "/moviesFavsUser.controller");
const searchUser = require(controllerBasePath + "/searchUser.controller");
const detail = require(controllerBasePath + "/detail.controller");

//singup y login tienen que ser únicas
//CRUD rutas
router.get('/dashboard', verifyToken, dashboardUser.getDashboardUser);
router.get('/movies', verifyToken, favMovies.getFavMoviesUser);
router.get('/search', verifyToken, searchUser.getSearchUser );
router.get('/detail/:id', verifyToken, detail.getDetail);

//Pendiente el post de logout (router.post('/logout', signup)); 
//Pendiente el get de /recoverpassword 
//Pendiente el get de /restorepassword

module.exports = router

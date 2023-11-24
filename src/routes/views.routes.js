const express = require("express");
const router = express.Router();
const controllerBasePath = "../controllers/controllers.views";
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin")

const getDashboard = require(controllerBasePath + "/dashboard.controller");
const getSearch = require(controllerBasePath + "/search.controller");
const getFavMovies = require(controllerBasePath + "/moviesFavsUser.controller");
const getDetails = require(controllerBasePath + "/detail.controller");
const createMovie = require(controllerBasePath + "/createMovie.controller");
const editMovie = require(controllerBasePath + "/editMovie.controller");

router.get("/dashboard", verifyToken, getDashboard.getDashboard);
router.get("/search", verifyToken, getSearch.getSearch);
router.get("/movies", verifyToken, getFavMovies.getFavMovies);
router.get("/detail/:id", verifyToken, getDetails.getDetails);
router.get("/createmovie", verifyToken, verifyAdmin, createMovie.createMovie);
router.get("/editmovie", verifyToken, verifyAdmin, editMovie.editMovie);

module.exports = router;

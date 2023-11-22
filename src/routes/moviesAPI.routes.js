const express = require('express');
const moviesAPIController = require("../controllers/api_controllers/movie_collection.controller");
const router = express.Router();

router.get('/search/:title', moviesAPIController.getMovies);
router.get('/detail/:id', moviesAPIController.getMoviesById)
router.post('/createMovie', moviesAPIController.createMovie);
router.put('/editMovie', moviesAPIController.updateMovie);
router.delete('/deleteMovie/:id', moviesAPIController.deleteMovie);

module.exports = router
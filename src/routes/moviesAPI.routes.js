const express = require('express');
const moviesApiController = require("../controllers/movieApi.controller");
const router = express.Router();

router.get('/search/:title', moviesApiController.getMovies);
// router.post('/createMovie', moviesApiController.createMovie);
// router.put('/editMovie:id', moviesApiController.updateMovie);
// router.delete('/removeMovie', moviesApiController.deleteMovie );

module.exports = router
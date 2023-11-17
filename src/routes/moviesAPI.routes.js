const express = require('express');
const moviesApiController = require("../controllers/movieApi.controller");
const router = express.Router();

router.get('/search/:title', moviesApiController.getMovies);
// router.get('/search/:user)

router.post('/createMovie', moviesApiController.postMovie);
// router.post('/createUser');

// router.put('/editMovie:id', moviesApiController.updateMovie);

// router.delete('/removeMovie', moviesApiController.deleteMovie);
// router.delete('/removeUser')

module.exports = router
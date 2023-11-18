const express = require('express');
const moviesApiController = require("../controllers/moviesApi.controller");
const router = express.Router();

router.get('/search/:title', moviesApiController.getMovies);
router.post('/createMovie', moviesApiController.postMovie);
router.put('/editMovie/:id', moviesApiController.putMovie);
router.delete('/deleteMovie/:id', moviesApiController.removeMovie);

module.exports = router
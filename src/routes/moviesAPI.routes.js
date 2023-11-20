const express = require('express');
const moviesAPIController = require("../controllers/moviesAPI.controller");
const router = express.Router();

router.get('/search/:title', moviesAPIController.getMovies);
router.post('/createMovie', moviesAPIController.postMovie);
router.put('/editMovie/:id', moviesAPIController.putMovie);
router.delete('/deleteMovie/:id', moviesAPIController.removeMovie);

module.exports = router
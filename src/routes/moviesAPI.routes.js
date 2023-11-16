const express = require('express');
const filmsApiController = require("../controllers/movieApi.controller");
const router = express.Router();

router.get('/search/:title', filmsApiController.getFilm);
router.post('/');
router.put('/');
router.delete('/');

module.exports = router
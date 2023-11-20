
const router = require('express').Router();

const createMovieController = require('../controllers/controllers.views/createMovie.controller')

router.get('/', createMovieController.createMovieAdmin)
module.exports = router;

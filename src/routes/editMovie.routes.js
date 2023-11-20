const router = require('express').Router();
const editMovieAdminController = require('../controllers/controllers.views/editMovie.controller');


router.get('/',editMovieAdminController.editMovie);


module.exports = router;
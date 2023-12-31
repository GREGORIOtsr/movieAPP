const express = require('express');
const favoritesAPIController = require("../controllers/api_controllers/user_favorites.controller")
const router = express.Router();


router.post('/addfavorite', favoritesAPIController.createFav);

router.get('/userfavorites', favoritesAPIController.getFavs);

router.delete('/removefavorite/:id', favoritesAPIController.deleteFav);

module.exports = router
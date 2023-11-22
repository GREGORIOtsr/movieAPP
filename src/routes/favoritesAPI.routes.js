const express = require('express');
const favoritesAPIController = require("../controllers/api_controllers/user_favorites.controller")
const router = express.Router();


router.post('/addfavorite', favoritesAPIController.createFav);
router.get('/userfavorites/:userId', favoritesAPIController.getFavs);
router.delete('/removefavorite', favoritesAPIController.deleteFav);



module.exports = router
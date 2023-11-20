const express = require('express');
const favoritesAPIController = require("../controllers/usersFavoritesAPI.controller")
const router = express.Router();


router.post('/addfavorite', favoritesAPIController.postFavorite);
router.get('/userfavorites/:userId', favoritesAPIController.getFavoriteById);
router.put('/editfavorite/:userId', favoritesAPIController.putFavorite);
router.delete('/removefavorite', favoritesAPIController.removeFavorite);



module.exports = router
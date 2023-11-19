const express = require('express');
const favoritesAPIController = require("../controllers/usersFavoritesAPI.controller")
const router = express.Router();


router.post('/addfavorite', favoritesAPIController.postFavorite);



module.exports = router
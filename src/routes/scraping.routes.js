const express = require('express');
const scrapingController = require("../controllers/controllers.views/detail.controller")
const router = express.Router();

router.get( "/scraperReviews", scrapingController.getDetail);

module.exports = router
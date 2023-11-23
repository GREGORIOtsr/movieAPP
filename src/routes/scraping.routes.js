const express = require('express');
const scrapingController = require("../controllers/scraping.controller")
const router = express.Router();

router.get( "/scraperReviews", scrapingController);

module.exports = router
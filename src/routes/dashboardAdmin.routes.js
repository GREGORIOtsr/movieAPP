const router = require('express').Router();
const dashboardAdminController = require('../controllers/controllers.views/dashboardAdmin.controller');


router.get('/',dashboardAdminController.getDashboardAdmin);


module.exports = router;
const express = require('express');
const usersAPIController = require("../controllers/usersAPI.controller")
const router = express.Router();

router.get('/user/:userId?', usersAPIController.getUser);
router.post('/createuser', usersAPIController.postUser);
router.put('/edituser/:userId', usersAPIController.putUser);
router.delete('/removeuser/:userId', usersAPIController.removeUser);


module.exports = router
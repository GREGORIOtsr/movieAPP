const express = require('express');
const usersApiController = require("../controllers/usersApi.controller");
const router = express.Router();

router.get('/user/:userId?', usersApiController.getUser);
router.post('/createuser', usersApiController.postUser);
router.put('/edituser/:userId', usersApiController.putUser);
router.delete('/removeuser/:userId', usersApiController.removeUser);


module.exports = router
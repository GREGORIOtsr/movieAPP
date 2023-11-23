const express = require('express');
const user_collection = require("../controllers/api_controllers/user_collection.controller")
const router = express.Router();

router.get('/', user_collection.getUser);
router.post('/', user_collection.createUser);
router.put('/', user_collection.updateUser);
router.delete('/', user_collection.deleteUser);

module.exports = router

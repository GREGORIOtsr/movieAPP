const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../schemas/mongo.users.schema');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

const verifyToken = express.Router();

verifyToken.use((req, res, next) => {
  const token = req.cookies['access-token'];

  if (token) {
    jwt.verify(token, secret, async (err, decoded) => {
      if (decoded) {
        let data = await User.findOne({ "email": decoded.email }, '-_id -__v -password');
        if (data.logged == true) {
          req.decoded = decoded;
          next();
        } else {
          return res.json({ msg: 'Invalid token' });
        }
      } else {
        res.send({ msg: "Invalid token" });
      }
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = verifyToken;

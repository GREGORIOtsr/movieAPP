const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAdmin = express.Router();

verifyAdmin.use((req, res, next) => {
    const token = req.cookies['access-token'];
    const user = jwt.decode(token, process.env.JWT_SECRET);
  
    if (user.role == 'Admin') {
      console.log('Yes admin');
      next();
    } else {
      console.log('Not admin');
      res.redirect('/dashboard')
    }
  });
  
  module.exports = verifyAdmin;
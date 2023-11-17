const express = require("express");
const userModel = require("../models/users");


const createUser = async (req, res) => {
  const data = req.body;

  const user = new User ({
    email: data.email,
    username: data.username,
    password: data.password,
    profile_pic: data.profile_pic,
    logged: data.logged,
    role:data
  });
  await user.save();
  res.status(201).json(user);
};





module.exports = {createUser};
const express = require("express");
const User = require("../models/users.model");

const getUser = async (req, res) => {
  try {
      const userId = req.params.userId; 
      const user = await User.getUser(userId); 
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const postUser = async (req, res) => {
  try {
      const userData = req.body; 
      const user = await User.createUser(userData)
      res.status(201).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const putUser = async (req, res) => {
  try {
      const userId = req.params.userId; 
      const updateData = req.body; 
      const user = await User.updateUser(userId, updateData)
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
      const userId = req.params.userId; 
      const user = await User.deleteUser(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {getUser, postUser, putUser, removeUser};



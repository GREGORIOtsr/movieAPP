const express = require("express");
const Favorites = require("../models/favorites.model");

const postFavorite = async (req, res) => {
    try {
        console.log(req.nody)
        const {user_id, movie_id } = req.body;  
        const userFavorite = await Favorites.addFavorite(user_id, movie_id)
        res.status(201).json(userFavorite)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

  module.exports ={postFavorite}
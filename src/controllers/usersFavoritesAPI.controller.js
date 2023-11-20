const express = require("express");
const Favorites = require("../models/favorites.model");

const postFavorite = async (req, res) => {
    try {
        
        const {user_id, movie_id } = req.body;  
        const userFavorite = await Favorites.addFavorite(user_id, movie_id)
        res.status(201).json(userFavorite)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFavoriteById = async (req, res) => {
    try {
        const user_id = req.params.userId; 
        const userFavorite = await Favorites.getFavoritebyId(user_id); 
        if (!userFavorite) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userFavorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const putFavorite = async (req,res) => {
    try {
        const user_id = req.params.userId; 
        const {movie_id, newMovie_id } = req.body; 

        const updatedFavorite = await Favorites.editFavorite(user_id, movie_id, newMovie_id);

        if (updatedFavorite[0] === 0) { 
            return res.status(404).json({ message: 'Favorite not found' });
        }

        res.status(200).json({ message: 'Favorite updated' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const removeFavorite = async (req, res) => {

    try {    
        const {user_id, movie_id } = req.body;  
        const userFavorite = await Favorites.deleteFavorite(user_id, movie_id)
        res.status(200).json(userFavorite)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports ={postFavorite, getFavoriteById, putFavorite, removeFavorite}
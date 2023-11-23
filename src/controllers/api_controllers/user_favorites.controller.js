const Users = require('../../schemas/sql.users.schema');
const User_favorites = require('../../schemas/sql.user_favorites.schema');
require('../../schemas/sql_associations');




const getFavs = async (req, res) => {
    try {
        const user = await Users.findOne({ where: {email: req.body.email} })
        const movies = await User_favorites.findAll({ where: {user_id: user.id}});
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const createFav = async (req, res) => {
    try {
        const user = await Users.findOne({ where: {email: req.body.email} })
        const newFav = await User_favorites.create({
            user_id: user.id,
            movie_id: req.body.movie_id
        });
        res.status(201).json(newFav);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
        
    }
};


const deleteFav = async (req, res) => {
    try {
        const user = await Users.findOne({ where: {email: req.body.email} })
        const movie = await User_favorites.destroy({ where: {
            user_id: user.id,
            movie_id: req.body.movie_id
        }});
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const controllers = {
    getFavs,
    createFav,
    deleteFav
}

module.exports = controllers;




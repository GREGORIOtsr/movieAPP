const Users = require('../../schemas/sql.users.schema');
const User_favorites = require('../../schemas/sql.user_favorites.schema');
const authUtils = require('../../utils/authUtils');
require('../../schemas/sql_associations');
Users.hasMany(User_favorites, {foreignKey: 'user_id'});





const getFavs = async (req, res) => {
    try {
        const currentUser = authUtils.getCurrentUser(req.cookies['access-token'] || req.headers['access-token']);
        const user = await Users.findOne({ where: {email: currentUser.email} })    
        const movies = await User_favorites.findAll({ where: {user_id: user.dataValues.user_id}});
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const createFav = async (req, res) => {
    try {      
        const currentUser = authUtils.getCurrentUser(req.cookies['access-token'] || req.headers['access-token']);   
        const user = await Users.findOne({ where: {email: currentUser.email} })
        const newFav = await User_favorites.create({
            user_id: user.dataValues.user_id,
            movie_id: req.body.movie_id
        });
        res.status(201).json(newFav);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
        
    }
};


const deleteFav = async (req, res) => {
    try {
        const currentUser = authUtils.getCurrentUser(req.cookies['access-token'] || req.headers['access-token']);   
        const user = await Users.findOne({ where: {email: currentUser.email} })
        const movie = await User_favorites.destroy({ where: {
            user_id: user.dataValues.user_id,
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




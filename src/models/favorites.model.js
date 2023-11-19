const userFavorites = require('../schemas/sql.user_favorites.schema');


const addFavorite = async (userId, movieId) => {
    try {
        const favorite = await userFavorites.create({
            user_id: userId,
            movie_id: movieId
        });
        return favorite;
    } catch (error) {
        throw error;
    }
};

const getFavoritebyId = async (userId) => {
    try {
        const favorite = await userFavorites.findAll({ where: { user_id: userId} })
        return favorite;
    } catch (error) {
        throw error;
    }
};


const editFavorite = async (userId, movieId, newMovieId) => {
    try {
        const newFavorite = await userFavorites.update({ movie_id: newMovieId }, {
            where: { user_id: userId, movie_id: movieId }
        });
        return newFavorite; 
    } catch (error) {
        throw error;
    }
};


const deleteFavorite = async (userId, movieId) => {
    try {
        const result = await userFavorites.destroy({
            where: { 
                user_id: userId,
                movie_id: movieId
            }
        });
        return result; 
    } catch (error) {
        throw error;
    }
};

module.exports = {addFavorite, getFavoritebyId, editFavorite, deleteFavorite}
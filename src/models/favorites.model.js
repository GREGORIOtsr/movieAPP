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

module.exports = {addFavorite}
const Movie = require('../schemas/mongo.movies.schema');


async function createMovie(movieData) {
    try {
        const movie = new Movie(movieData);
        await movie.save();
        return movie;
    } catch (error) {
        throw error;
    }
}

async function updateMovie(movieId, updateData) {
    try {
        const movie = await Movie.findByIdAndUpdate(movieId, updateData, { new: true });
        return movie;
    } catch (error) {
        throw error;
    }
}


async function deleteMovie(movieId) {
    try {
        const movie = await Movie.findByIdAndDelete(movieId);
        return movie;
    } catch (error) {
        throw error;
    }
}

module.exports = { createMovie, updateMovie, deleteMovie };
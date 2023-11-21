const apiMovie = require("../../services/fetchMovies");



const getDetail = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id || isNaN(id)) {
            return res.status(400);
        }

        const movieDetails = await apiMovie.fetchMovieDetail(parseInt(id));
        const movieCredits = await apiMovie.fetchCredits(parseInt(id));

        if (!movieDetails) {
            return res.status(404).send("Movie not found");
        }

        // let directors = [];
        // let actors = [];

        // if (movieCredits) {
        //     directors = movieCredits.crew.filter(person => person.job === 'Director');
        //     actors = movieCredits.cast ? movieCredits.cast.slice(0, 3) : [];
        // }

        res.render('detail', {movieDetails: movieDetails});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDetail
};
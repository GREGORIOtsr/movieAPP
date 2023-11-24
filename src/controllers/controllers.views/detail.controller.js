const apiMovie = require("../../services/fetchMovies");
// const scraperSensa = require("../../utils/scraperSensa");
const scraperFilmAffinity = require("../../utils/scraperFilmAffinity");

const getDetail = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id || isNaN(id)) {
            return res.status(400);
        }

        const movieDetails = await apiMovie.fetchMovieDetail(parseInt(id));
        const movieCredits = await apiMovie.fetchCredits(parseInt(id));   
        // const movieReviewsSensaCine = await scraperSensa(movieDetails.title);    
        const movieReviewsFilmAffinity = await scraperFilmAffinity(movieDetails.title);       
        const movieTrailer= await apiMovie.fetchTrailer(parseInt(id));

        if (!movieDetails) {
            return res.status(404).send("Movie not found");
        }

        let directors = [];

        if (movieCredits && Array.isArray(movieCredits.crew)) {
            directors = movieCredits.crew.filter(person => person.job === 'Director');
        }

        let actors = [];

        if (movieCredits && Array.isArray(movieCredits.cast)) {
            actors = movieCredits.cast.slice(0, 3); 
        }
     
        let trailerKey = null;

        if (movieTrailer && movieTrailer.results) {
            const trailer = movieTrailer.results.find(trailer => trailer.site === "YouTube" && trailer.type === "Trailer");
            if (trailer) {
                trailerKey = trailer.key;
            }
        }

        if (trailerKey) {
            console.log("Trailer key:", trailerKey);
        } else {
            console.log("Trailer not found");
        }

        console.log(trailerKey)

        res.render('detail', {movieDetails: movieDetails, directors: directors, actors: actors, trailerKey: trailerKey, reviews: movieReviewsFilmAffinity});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

module.exports = {
    getDetail
};
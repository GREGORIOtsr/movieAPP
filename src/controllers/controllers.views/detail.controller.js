const apiMovie = require('../../services/fetchMovies');


const getDetail = async (req,res)=>{

    try {
        const id = req.params.id;

        if (!id || isNaN(id)) {

            return res.status(400);
        }

        const movieDetails = await apiMovie.fetchMovieDetail(parseInt(id));
        console.log(movieDetails)

        if (movieDetails) {
            res.render('detail', { movieDetails: movieDetails });
        } else {
            res.status(404);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getDetail
}
const User = require('../../schemas/mongo.users.schema');
const Movie = require('../../schemas/mongo.movies.schema');
const apiMovie = require('../../services/fetchMovies');

const getMovies = async (req, res) => {
    try {
        let title = req.params.title;
        title = title.substring(1);
        let movies = await Movie.find({title: new RegExp(title, 'i')})
        .populate('createdBy', 'email -_id')
        .select('-_id -__v');

        if (movies.length === 0) {
            movies = await apiMovie.fetchMovie(title);
        }
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const getMoviesByEmail = async (email) => {
    const user = await User.findOne({email: email})
    const movies = await Movie
        .find({createdBy: user.id})
        .populate('createdBy', 'email -_id')
        .select('-_id -__v');
    return movies;
}

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie
            .find()
            .populate('createdBy', 'email -_id')
            .select('-_id -__v');
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const getMoviesById = async (req, res) => {
    try {
        const id = req.params.id; 

        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "Invalid movie ID" });
        }
        
        const movieDetails = await apiMovie.fetchMovieDetail(parseInt(id));
        
        res.status(200).json(movieDetails);
    } catch (error) {
        res.status(500).json({ message: `Error fetching movie details: ${error.message}` });
    }
};

const getCreditsById = async (req, res) => {
    try {
        const id = req.params.id; 

        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "Invalid movie ID" });
        }
        
        const movieCredits = await apiMovie.fetchCredits(parseInt(id));
        
        res.status(200).json(movieCredits);
    } catch (error) {
        res.status(500).json({ message: `Error fetching movie credits: ${error.message}` });
    }
};



const createMovie = async (req, res) => {
    try{
        const data = req.body;
        const userRef = await User.findOne({email: req.body.createdBy});
        data.createdBy = userRef._id.toString();
        const movie = await new Movie(data).save();
        res.status(201).json({message: `Movie created.`, data: movie});
    }catch (error) {
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};

const updateMovie = async (req, res) => {
    try {
        const { createdBy, ...updateData } = req.body;    
        const userRef = await User.findOne({ email: createdBy });
        updateData.createdBy = userRef._id;       
        const movie = await Movie.findOneAndUpdate({ title: req.body.title }, updateData, { new: true });
        res.status(200).json({message: `Movie updated.`, data: movie});
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const deleteMovie = async (req, res) => {
    try {
        await Movie.deleteOne({title: req.body.title});
        res.status(200).json({message: `Movie deleted.`});
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const deleteAllMovies = async (req, res) => {
    try {
        let userRef = await User.findOne({email: req.body.email});
        await Movie.deleteMany({createdBy: userRef._id});
        res.status(200).json({message: `Movies deleted.`});
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const controllers = {
    getMovies,
    getAllMovies,
    getMoviesByEmail,
    getMoviesById,
    getCreditsById,
    createMovie,
    updateMovie,
    deleteMovie,
    deleteAllMovies
};

module.exports = controllers;

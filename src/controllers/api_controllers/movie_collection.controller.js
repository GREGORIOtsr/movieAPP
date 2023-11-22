const User = require('../../schemas/mongo.users.schema');
const Movie = require('../../schemas/mongo.movies.schema');
const apiMovie = require('../../services/fetchMovies');

const getMovies = async (req, res) => {
    try {
        let title = req.params.title;
        title = title.substring(1);
        let movies = await Movie.find({title: new RegExp(title, 'i')}, '-_id -__v');
        console.log('Buscando en la base de datos por título:', title, 'Resultados:', movies);

        if (movies.length === 0) {
            console.log('No se encontraron películas en la base de datos, buscando a través de la API');
            movies = await apiMovie.fetchMovie(title);
            console.log('Resultados de la API')
        }
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const getMovieByUser = async (req, res) => {
    try {
        const movies = await Movie
            .find()
            .populate('user', '-_id -__v')
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


const createMovie = async (req, res) => {
    try{
        const data = req.body;
        const userRef = await User.findOne({email: req.body.email});
        data.createdBy = userRef._id.toString();
        await new Movie(data).save();
        res.status(201).json({message: `Movie created.`});
    }catch (error) {
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};

const updateMovie = async (req, res) => {
    try {
        await Movie.findOneAndUpdate({title: req.body.title}, req.body, {new: true});
        res.status(200).json({message: `Movie updated.`});
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
    getMovieByUser,
    getMoviesById,
    createMovie,
    updateMovie,
    deleteMovie,
    deleteAllMovies
};

module.exports = controllers;

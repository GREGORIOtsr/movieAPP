const User = require('../../schemas/mongo.users.schema');
const Movie = require('../../schemas/mongo.movies.schema');

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({}, '-_id -__v')
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
    createMovie,
    updateMovie,
    deleteMovie,
    deleteAllMovies
};

module.exports = controllers;

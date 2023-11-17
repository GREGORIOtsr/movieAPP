const apiMovie = require('../services/fetchMovies');
const Movie = require('../models/movies.model');
const { createMovie, updateMovie, deleteMovie } = require('../models/movies.model');



const getMovies = async (req, res) =>{ 
    try {
        const title = req.params.title
/*
Busca primero en mongo
        let movies = await Movie.find({ title: new RegExp(title, 'i') }); //busca primero en mongo, 

        if (movies.length === 0) {
  Si no encuentra, va al fetch
              movies = await apiMovie.fetchMovie(title);
*/              
        let movies = await apiMovie.fetchMovie(title); 
        res.status(200).json(movies); 
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }

}

const postMovie = async  (req, res) => {
    try {
        const movie = await createMovie(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const putMovie = async (req, res) => {
    try {
        const movie = await updateMovie(req.params.id, req.body);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const removeMovie = async (req, res) => {
    try {
        const movie = await deleteMovie(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {getMovies, postMovie, putMovie, removeMovie };




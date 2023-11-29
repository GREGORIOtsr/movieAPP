/**
 * @author Gregorio Tremont, Maria Diana Noaghiul, Alejandro Márquez
 * @exports moviesApi
 * @namespace CRUDmoviesApi
 */

const apiMovie = require('../../services/fetchMovies');
const Movie = require('../../models/movies.model');
const { createMovie, updateMovie, deleteMovie } = require('../../models/movies.model');


/**
 * Obtiene información sobre películas por título, primero buscando en la base de datos local y luego a través de una API externa si no se encuentran resultados.
 * @memberof CRUDmoviesApi 
 * @method getMovies
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el parámetro 'title' en los parámetros (params).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un arreglo de películas en formato JSON.
 */
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

/**
 * Crea una nueva película utilizando los datos proporcionados en el cuerpo de la solicitud y responde con la película creada.
 * @memberof CRUDmoviesApi 
 * @method postMovie
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene los datos de la nueva película en el cuerpo (body).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con la nueva película en formato JSON.
 */
const postMovie = async  (req, res) => {
    try {
        const movie = await createMovie(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


/**
 * Actualiza una película existente en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud y los nuevos datos en el cuerpo de la solicitud.
 * @memberof CRUDmoviesApi 
 * @method putMovie
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el ID de la película en los parámetros (params) y los nuevos datos en el cuerpo (body).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con la película actualizada en formato JSON o un mensaje de error si la película no se encuentra.
 */
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


/**
 * Elimina una película de la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
 * @memberof CRUDmoviesApi 
 * @method removeMovie
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el ID de la película en los parámetros (params).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un código 204 (sin contenido) si la película se elimina con éxito, o un mensaje de error si la película no se encuentra.
 */
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




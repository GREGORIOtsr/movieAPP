/**
 * @author Gregorio Tremont, Maria Diana Noaghiul, Alejandro Márquez 
 * @exports movie_collection
 * @namespace CRUDmovie_collection 
 */

const User = require('../../schemas/mongo.users.schema');
const Movie = require('../../schemas/mongo.movies.schema');
const apiMovie = require('../../services/fetchMovies');

/**
 * Obtiene películas por título, primero buscando en la base de datos y luego a través de una API si no se encuentran resultados.
 * @memberof CRUDmovie_collection 
 * @method getMovies  
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express.
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un arreglo de películas en formato JSON.
 */
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

/**
 * Obtiene todas las películas asociadas a usuarios mediante la relación de referencia 'user' en el modelo 'Movie'.
 * @memberof CRUDmovie_collection 
 * @method getMovieByUser 
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express.
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un arreglo de películas en formato JSON.
 */
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


/**
 * Obtiene detalles de una película por su ID, primero verificando la validez del ID y luego consultando una API externa.
 * @memberof CRUDmovie_collection 
 * @method getMoviesById 
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el parámetro 'id' que representa el ID de la película.
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con los detalles de la película en formato JSON.
 */
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



/**
 * Obtiene los créditos de una película por su ID, verificando la validez del ID y consultando una API externa.
 * @memberof CRUDmovie_collection 
 * @method getCreditsById  
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el parámetro 'id' representando el ID de la película.
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con los créditos de la película en formato JSON.
 */
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




/**
 * Crea una nueva película utilizando los datos proporcionados en el cuerpo de la solicitud,
 * asociándola al usuario cuyo correo electrónico se especifica en la solicitud.
 * @memberof CRUDmovie_collection 
 * @method createMovie
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene los datos de la nueva película en el cuerpo (body) y el correo electrónico del usuario.
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un mensaje indicando que la película fue creada con éxito.
 */
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



/**
 * Actualiza una película existente en la base de datos utilizando el título proporcionado en el cuerpo de la solicitud.
 * @memberof CRUDmovie_collection 
 * @method updateMovie
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el título de la película a actualizar y los nuevos datos en el cuerpo (body).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un mensaje indicando que la película fue actualizada con éxito.
 */
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


/**
 * Elimina una película de la base de datos utilizando el título proporcionado en el cuerpo de la solicitud.
 * @memberof CRUDmovie_collection 
 * @method deleteMovie  
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el título de la película a eliminar en el cuerpo (body).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un mensaje indicando que la película fue eliminada con éxito.
 */
const deleteMovie = async (req, res) => {
    try {
        await Movie.deleteOne({title: req.body.title});
        res.status(200).json({message: `Movie deleted.`});
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};


/**
 * Elimina todas las películas asociadas a un usuario específico en la base de datos, identificando al usuario por su correo electrónico.
 * @memberof CRUDmovie_collection 
 * @method deleteAllMovies  
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el correo electrónico del usuario en el cuerpo (body).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un mensaje indicando que las películas fueron eliminadas con éxito.
 */
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

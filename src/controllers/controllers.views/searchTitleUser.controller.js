// const fetchMovie = require('../../services/fetchMovies');

// const getMovieDetail = async (req, res) => {
//     try {
//         const id = req.params.title;
//         let products = await fetchMovie.fetchMovieDetail(title); //{}
//         console.log(products);
//         res.status(200).render('products',{products, msj:"productos here!"}); // Respuesta de la API para 1 producto
//     }
//     catch (error) {
//         console.log(`ERROR: ${error.stack}`);
//         res.status(400).json({msj:`ERROR: ${error.stack}`});
//     }

// }

// module.exports = {getMovieDetail}
const apiMovie = require('../services/fetchMovies');


const getMovies = async (req, res) =>{ 
    try {
        const title = req.params.title
        let movies = await apiMovie.fetchMovie(title); 
        res.status(200).json(movies); 
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }

}




// const getMovieDetail = async (req, res) => {
//     try {
//         const title = req.params.title;
//         let movie = await fetchMovie.fetchMovieDetail(title); 
//         res.status(200).json(movie); 
//     }
//     catch (error) {
//         console.log(`ERROR: ${error.stack}`);
//         res.status(400).json({msj:`ERROR: ${error.stack}`});
//     }
// }


// const createMovie = async (req, res) => {
//     try {
//         const { title, genres, image, duration, description, director, actors, rating  } = req.body;


//         const newMovie = new Movie({
//             title,
//             genres,
//             image,
//             duration,
//             description,
//             director,
//             actors,
//             rating 
//         });

//         await newMovie.save();

//         res.status(201).send(newMovie);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };


// const updateMovie = async (req, res) => {
//     try {
//         let data= {title, genres, image, duration, description, director, actors, rating } = req.body;

//         const movie = await Movie.findOneAndUpdate(
//             { company_name: company_name }, 
//             { $set: data },
//             { new: true, runValidators: true }
//         );


//         if (!movie) {
//             return res.status(404).send('Proveedor no encontrado');
//         }

//         res.status(200).send({
//             message: `Movie updated: ${movie.title}`,
//         });
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };


// const deleteProvider = async (req, res) => {
//     try {
//         const { id } = req.body; 

//         const deletedMovie = await Movie.findOneAndDelete({id:id} );

//         if (!deletedMovie) {
//             return res.status(404).send('Movie not found');
//         }

//         res.status(200).send({ 
//             message: `Movie deleted succesfully`,
//             provider: deletedMovie
//         });
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };


module.exports = {getMovies}


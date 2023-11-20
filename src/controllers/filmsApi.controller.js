
const fetchMovie = require('../services/fetchFilm');

const getFilm = async (req, res) => {
    try {
        const title = req.params.title;
        let films = await fetchMovie(title); 
        res.status(200).json(films); 
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
}


module.exports = {getFilm}
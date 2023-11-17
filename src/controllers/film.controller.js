const fetchMovie = require('../services/fetchFilm');

const getMovie = async (req, res) => {
    try {
        const id = req.params.id;
        let products = await fetchProduct.getProduct(id); //{}
        console.log(products);
        res.status(200).render('products',{products, msj:"productos here!"}); // Respuesta de la API para 1 producto
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }

}

module.exports = {getFilm}
const getFavMovies = (req,res)=>{
    try {
        res.status(200).render('moviesUser');
    } catch (error) {
        res.status(400).json({ message: `ERROR: ${error.stack}` });
    }
}

module.exports = {
    getFavMovies
}
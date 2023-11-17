const createMovieAdmin = (req,res)=>{

 

    res.status(200).render('createMovie.pug');
}

module.exports = {
    createMovieAdmin
}
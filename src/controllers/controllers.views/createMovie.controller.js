const createMovieAdmin = (req,res)=>{

 

    res.status(200).render('createMovie.admin.pug');
}

module.exports = {
    createMovieAdmin
}
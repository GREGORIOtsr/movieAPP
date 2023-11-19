const getFavMoviesUser = (req,res)=>{

    //validacion de user autenticado y rol admin

    res.render('moviesUser');
}

module.exports = {
    getFavMoviesUser
}
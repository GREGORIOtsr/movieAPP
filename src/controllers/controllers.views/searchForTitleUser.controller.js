const getSearchTitleUser = (req,res)=>{

    //validacion de user autenticado y rol admin

    res.render('searchForTitleUser');
}

module.exports = {
    getSearchTitleUser
}
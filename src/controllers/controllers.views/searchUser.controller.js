const getSearchUser = (req,res)=>{

    //validacion de user autenticado y rol admin
    
    res.render('searchUser');
}

module.exports = {
    getSearchUser
}
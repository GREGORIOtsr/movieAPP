const gethomeLogin = (req,res)=>{

    //validacion de user autenticado y rol admin
    
    res.render('homeLogin');
}

module.exports = {
    gethomeLogin
}
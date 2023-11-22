const homeSignup = (req,res)=>{

    //validacion de user autenticado y rol admin
    
    res.render('homeSignup');
}

module.exports = {
    homeSignup
}
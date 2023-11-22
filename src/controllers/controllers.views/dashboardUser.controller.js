const getDashboardUser = (req,res)=>{
    //validacion de user autenticado y rol admin
    
    res.render('homeProfileUser');
}

module.exports = {
    getDashboardUser
}
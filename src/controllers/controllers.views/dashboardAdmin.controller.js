const getDashboardAdmin = (req,res)=>{

    //validacion de user autenticado y rol admin

    res.status(200).render('dashboardAdmin');
}

module.exports = {
    getDashboardAdmin
}
const getDashboardAdmin = (req,res)=>{

    //validacion de user autenticado y rol admin

    res.status(200).render('dashboard.admin.pug');
}

module.exports = {
    getDashboardAdmin
}
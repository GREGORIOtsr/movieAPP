const authUtils = require('../../utils/authUtils');
const movieCont = require('../api_controllers/movie_collection.controller');

const getDashboardAdmin = async (req,res)=>{
    const user = authUtils.getCurrentUser(req.cookies['access-token']);
    const movies = await movieCont.getMoviesByEmail(user.email);
    res.status(200).render('dashboardAdmin', {username: user.username, movies: movies});
}

module.exports = {
    getDashboardAdmin
}
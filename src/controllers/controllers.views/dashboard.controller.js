const authUtils = require("../../utils/authUtils");
const movieCont = require("../api_controllers/movie_collection.controller");

const getDashboard = async (req, res) => {
  try {
    const user = authUtils.getCurrentUser(req.cookies["access-token"]);
    if (user.role == "Admin") {
      const movies = await movieCont.getMoviesByEmail(user.email);
      res
        .status(200)
        .render("dashboardAdmin", { username: user.username, movies: movies, nav: 'navBarAdmin.pug' });
    } else {
      res.status(200).render("homeProfileUser", { username: user.username });
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

module.exports = {
  getDashboard,
};

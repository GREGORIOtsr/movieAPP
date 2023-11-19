const express = require('express');
const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

const moviesAPIRoutes = require("./routes/moviesAPI.routes");
const usersAPIroutes = require("./routes/usersAPI.routes");
const favoritesAPIroutes = require("./routes/favoritesAPI.routes");
const viewsAdmin = require('./routes/dashboardAdmin.routes');
const createMovieAdmin = require('./routes/createMovie.routes');
const editMovieAdmin = require('./routes/editMovie.routes');

//Rutas API
app.use('/api', moviesAPIRoutes);
app.use('/api', usersAPIroutes);
app.use('/api', favoritesAPIroutes);

//Rutas views
app.use('/dashboardadmin', viewsAdmin);
app.use('/createmovie', createMovieAdmin);
app.use('/editmovie', editMovieAdmin);


// Morgan logger
const morgan = require('./middlewares/morgan');
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));



app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
})

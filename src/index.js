const express = require('express');
const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;
const helmet = require('helmet')
// const scraperSensaCine = require('./utils/scraperSensaCine.js')
// const scraperFilmAffinity = require('./utils/scraperFilmAffinity.js')

// Se indica el directorio donde se almacenarán las plantillas 
app.set('views', './views');

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'pug');
app.use(express.static('public'))
app.use(helmet());


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

const viewsUserRoutes = require("./routes/viewsUser.routes")
const authenticationRoutes = require("./routes/authentication.routes")

// Morgan logger
const morgan = require('./middlewares/morgan');



app.use('/', viewsUserRoutes);
app.use('/', authenticationRoutes);



app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
})

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
require('./config/google.config');
require('./config/jwt.config')(passport);

const app = express();
const port = process.env.PORT || 3000;
const helmet = require('helmet')
// const scraperSensaCine = require('./utils/scraperSensaCine.js')
// const scraperFilmAffinity = require('./utils/scraperFilmAffinity.js')

// Initialize express
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.set("trust proxy", 1);

// Initialize passport and session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {},
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

const corsOptions = {
    origin: process.env.DOMAIN_URL || 'http://localhost:3000',
    credentials: false
};
app.use(cors(corsOptions));

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
const authRoute = require('./routes/authentication.routes');
const auth = require('./controllers/auth.controller');

// Google prompt route and sign in route
app.get("/auth/google", passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failed' }), auth.googleAuth);


app.use('/', authRoute);

//Rutas API
// app.use('/api', moviesAPIRoutes);
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

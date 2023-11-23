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

app.use(cookieParser());

// Initialize passport and session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// const corsOptions = {
//     origin: process.env.DOMAIN_URL || 'http://localhost:3000',
//     credentials: false
// };
// app.use(cors(corsOptions));
app.use('*', cors());


// Se indica el directorio donde se almacenarán las plantillas 
app.set('views', './views');

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'pug');
app.use(express.static('public'))
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https:", "data:"],
      "frame-src": ["'self'", "https://www.youtube.com", "https://youtube.com"],
      "script-src": ["'self'", "https://www.youtube.com", "https://s.ytimg.com"],
      "child-src": ["'self'", "https://www.youtube.com", "https://youtube.com"] // si estás usando iframes para YouTube
    }
  })
);
const moviesAPIRoutes = require("./routes/moviesAPI.routes");
const usersAPIroutes = require("./routes/usersAPI.routes");
const favoritesAPIroutes = require("./routes/favoritesAPI.routes");

const viewsAdminRoutes = require('./routes/views.admin.routes');
const viewsUserRoutes = require("./routes/viewsUser.routes")
const authRoute = require('./routes/authentication.routes');
const auth = require('./controllers/auth.controller');

// Google prompt route and sign in route
app.get("/auth/google", passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failed' }), auth.googleAuth);


app.use('/', authRoute);

//Rutas API
app.use('/api', moviesAPIRoutes);
app.use('/api', usersAPIroutes);
app.use('/api', favoritesAPIroutes);

//Rutas views
app.use('/', viewsUserRoutes);
app.use('/', viewsAdminRoutes)



// Morgan logger
const morgan = require('./middlewares/morgan');



app.use('/', viewsUserRoutes);
app.use('/', viewsAdminRoutes)

app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
})

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet')
require('dotenv').config();
require('./config/google.config');
require('./config/jwt.config')(passport);
const path = require('path')

const app = express();
const port = process.env.PORT || 3000;

// Initialize express
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// Securiting config
app.set("trust proxy", 1);
app.use('*', cors());
app.use(cookieParser());

//Para documentación con jsdoc:
app.use('/api-jsdoc', express.static(path.join(__dirname, '/jsondocs')));

// Initialize passport and session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Pug views config
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'))

// Helmet config
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
const views = require('./routes/views.routes');
const authRoute = require('./routes/authentication.routes');
const auth = require('./controllers/auth.controller');

// Google prompt route and sign in route
app.get("/auth/google", passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failed' }), auth.googleAuth);

// Authentication routes
app.use('/', authRoute);

//API routes
app.use('/api', moviesAPIRoutes);
app.use('/api/user', usersAPIroutes);
app.use('/api', favoritesAPIroutes);

//View route
app.use('/', views);

// Morgan logger
const morgan = require('./middlewares/morgan');
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
})

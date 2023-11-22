const express = require('express');
const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;
const helmet = require('helmet');

// Se indica el directorio donde se almacenarán las plantillas 
app.set('views', './views');

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'pug');
app.use(express.static('public'))
app.use(helmet());

const moviesAPIRoutes = require("./routes/moviesAPI.routes");
const usersAPIroutes = require("./routes/usersAPI.routes");
const favoritesAPIroutes = require("./routes/favoritesAPI.routes");
const viewsAdminRoutes = require('./routes/views.admin.routes');
const viewsUserRoutes = require("./routes/viewsUser.routes")
const authenticationRoutes = require("./routes/authentication.routes")

//Rutas API
app.use('/api', moviesAPIRoutes);
app.use('/api', usersAPIroutes);
app.use('/api', favoritesAPIroutes);

//Rutas views
// app.use('/dashboardadmin', viewsAdmin);



// Morgan logger
const morgan = require('./middlewares/morgan');



app.use('/', viewsUserRoutes);
app.use('/', viewsAdminRoutes)
app.use('/', authenticationRoutes);



app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
})

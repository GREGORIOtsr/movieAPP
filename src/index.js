const express = require('express');
const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

const moviesRoutes = require("./routes/filmsAPI.routes")
const viewsUserRoutes = require("./routes/views.user.routes")
const viewsAdminRoutes = require("./routes/views.admin.routes")

// Morgan logger
const morgan = require('./middlewares/morgan');
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

//Rutas del user
app.use('/search/title', viewsUserRoutes);
app.use('/search', viewsUserRoutes);
// app.use('/api/search/title')
// app.use('/api/search')
app.use('/dashboard', viewsUserRoutes);
app.use('/movies', viewsUserRoutes);
app.use('/login', viewsUserRoutes);
app.use('/signup', viewsUserRoutes);

//Rutas del admin
app.use('/createMovie', viewsAdminRoutes);
app.use('/editMovie/:id', viewsAdminRoutes);
app.use('/login', viewsAdminRoutes);
app.use('/signup', viewsAdminRoutes);
app.use('/recoverpassword', viewsAdminRoutes);
app.use('/restorepassword', viewsAdminRoutes);
app.use('/removeMovie', viewsAdminRoutes);
// Falta la del dashboard de admin: app.use('/removeMovie', viewsAdminRoutes);



app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
})

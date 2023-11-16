const express = require('express');
const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

const moviesApiRoutes = require("./routes/moviesAPI.routes")
const viewsAdmin = require('./routes/views.admin.routes')
const createMovieAdmin = require('./routes/createMovie.routes')
//Rutas API
app.use('/api/', moviesApiRoutes);
// app.use('/api/createMovie'.moviesApiRoutes)
// // app.use('/editMovie'.moviesApiRoutes)
// // app.use('/api/removeMovie'.moviesApiRoutes)
app.use('/dashboardadmin', viewsAdmin);
app.use('/createmovie', createMovieAdmin);


// Morgan logger
const morgan = require('./middlewares/morgan');
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));



app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
})

const express = require('express');
const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

const moviesRoutes = require("./routes/filmsAPI.routes")
const viewsUserRoutes = require("./routes/views.user.routes")

// Morgan logger
const morgan = require('./middlewares/morgan');
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
app.use('/', moviesRoutes)
app.use("/", viewsUserRoutes)


app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
})

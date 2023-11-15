const express = require('express');
const app = express();
app.use(express.json())

const port = process.env.PORT || 3000;

// Morgan logger
const morgan = require('./middlewares/morgan');
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
})

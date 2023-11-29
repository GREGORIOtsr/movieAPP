const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MDB_CONNECTION_STRING || 'mongodb://localhost:27017');

const db = mongoose.connection;

db.on("error", error => console.log(error));
db.once("open", () => console.log("Connection to MongoDB established"));

module.exports = mongoose;

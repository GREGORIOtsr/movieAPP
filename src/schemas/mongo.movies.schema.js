const mongoose = require('mongoose');
require('../config/mongo_connection');
const regex = require('../utils/regex');

const objectSchema = {
    title: {
        type: String,
        require: true
    },
    poster: {
        type: String,
        require: true,
        // validate: {
        //     validator: (str) => {return regex.image.test(value);}, 
        //     message: "Invalid image, must be JPG, JPGE or PNG file."
        // }
    },
    date: {
        type: String,
        require: true
    },
    genre: {
        type: [String], // Array string for one or more genres
        require: true
    },
    runtime: {
        type: Number, // Minutes
        require: true
    },
    synopsis: {
        type: String,
        require: true,
        // validate: {
        //     validator: (str) => {return str.length > 359},
        //     message: "Synopsis must have a minimum of 360 characters."
        // }
    },
    director: {
        type: String,
        require: true
    },
    actors: {
        type: [String]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}

const moviesSchema = mongoose.Schema(objectSchema);

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;
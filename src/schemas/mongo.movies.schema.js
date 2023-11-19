const mongoose = require('mongoose');
require('../config/mongo_connection');
const regex = require('../utils/regex');

const objectSchema = {
    title: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true,
        // validate: {
        //     validator: (str) => {return regex.image.test(value);}, 
        //     message: "Invalid image, must be JPG, JPGE or PNG file."
        // }
    },
    date: {
        type: String,
        required: true
    },
    genre: {
        type: [String], // Array string for one or more genres
        required: true
    },
    runtime: {
        type: Number, // Minutes
        required: true
    },
    synopsis: {
        type: String,
        required: true,
        // validate: {
        //     validator: (str) => {return str.length > 359},
        //     message: "Synopsis must have a minimum of 360 characters."
        // }
    },
    director: {
        type: [String],
        required: true
    },
    actors: {
        type: [String]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}

const moviesSchema = mongoose.Schema(objectSchema);

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;

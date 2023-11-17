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
        validate: {
            validator: function(value){
                return regex.image.test(value);
            }, 
            message: "Invalid image, must be JPG, JPGE or PNG file."
        }
    },
    year: {
        type: Number,
        require: true
    },
    genre: {
        type: [String],
        require: true
    },
    duration :{
        type: String
    },
    synopsis,
    director,
    actors,
    createdBy
}

const moviesSchema = mongoose.Schema(objectSchema);

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;


// provider: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Provider',
//     required: true
// }
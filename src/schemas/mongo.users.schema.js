const mongoose = require('mongoose');
require('../config/mongo_connection');
const regex = require('../utils/regex');

const objectSchema = {
    email: { 
        type: String, 
        required: true,
        unique: true,
        // validate: {
        //     validator: (str) => {return regex.email.test(str)}, 
        //     message: "Invalid email format."
        // }
    },
    username: { 
        type: String,
        required: true
    },
    password: {

        type: String

    },
    profile_pic: {
        type: String,
        // validate: {
        //     validator: (str) => {return regex.image.test(str)}, 
        //     message: "Invalid image, must be JPG, JPGE or PNG file."
        // }
    },
    role: {
        type: String,
        required: true,
        default: 'Member'
    },
    logged: {
        type: Boolean,
        default: false
    }
};

const usersSchema = mongoose.Schema(objectSchema);

const User = mongoose.model('User', usersSchema);


module.exports = User;


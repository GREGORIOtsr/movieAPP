const mongoose = require('mongoose');
require('../config/mongo_connection');
const regex = require('../utils/regex');

const objectSchema = {
    email: { 
        type: String, 
        require: true,
        unique: true,
        validate: {
            validator: function(value){
                return regex.email.test(value);
            }, 
            message: "Invalid email format."
        }
    },
    username: { 
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    profile_pic: {
        type: String,
        validate: {
            validator: function(value){
                return regex.image.test(value);
            }, 
            message: "Invalid image, must be JPG, JPGE or PNG file."
        }
    },
    logged: {
        type: Boolean,
        default: false
    }
};

const usersSchema = mongoose.Schema(objectSchema);

const User = mongoose.model('User', usersSchema);

module.exports = User;
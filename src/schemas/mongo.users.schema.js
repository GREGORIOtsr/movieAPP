const mongoose = require('mongoose');
require('../config/mongo_connection');
const regex = require('../utils/regex');

const objectSchema = {
    email: { 
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return regex.email.test(value);
            }, 
            message: "Invalid email format."
        }
    },
    name: { 
        type: String, 
        required: true
    },
    username: { 
        type: String
    },
    profile_pic:{
        type: String,
        validate: {
            validator: function(value){
                return regex.image.test(value);
            }, 
            message: "Invalid image, must be JPG, JPGE or PNG file."
        }
    }
};

const providerSchema = mongoose.Schema(objectSchema);

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;

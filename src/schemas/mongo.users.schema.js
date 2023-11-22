const mongoose = require("mongoose");
require("../config/mongo_connection");
const regex = require("../utils/regex");
const bcrypt = require('bcrypt');
const passportLocalMongoose = require("passport-local-mongoose");

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
    required: true,
  },
  password: {
    type: String,
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
    default: "Member",
  },
  logged: {
    type: Boolean,
    default: false,
  },
};

const usersSchema = mongoose.Schema(objectSchema);

// pre saving user
usersSchema.pre("save", function (next) {
  const user = this;
  if (user.password) {
    // Only hash the password if it has been modified or is new
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (error, salt) {
        if (error) return next(error);
  
        bcrypt.hash(user.password, salt, function (error, hash) {
          if (error) return next(error);
          user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  } else {
    return next();
  };
});

// post saving user
usersSchema.post("save", function (user, next) {
  next();
});

// Compare password
usersSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

usersSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", usersSchema);

module.exports = User;

const passportJWT = require("passport-jwt");
const User = require("../schemas/mongo.users.schema");
require("dotenv").config();

// Passport & JWT config
const { Strategy: JWTStrategy, ExtractJwt: ExtractJWT } = passportJWT;

// define passport jwt strategy
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = `${process.env.JWT_SECRET}`;
const passportJWTStrategy = new JWTStrategy(opts, function(jwtPayload, done) {
  // retreive mail from jwt payload
  const email = jwtPayload.email;
  const user = User.findOne({email: email});
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  };
});

// Config passport
module.exports = function(passport) {
  // token strategy
  passport.use(passportJWTStrategy);

  // return configured passport
  return passport;
};

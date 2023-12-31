const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    callbackURL: `${process.env.DOMAIN_URL}/google/callback` || `http://localhost:3000/google/callback`,
    scope: ['email', 'profile'],
    proxy: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
    done(null,user)
});

passport.deserializeUser(function (user, done) {
    done(null,user)
});
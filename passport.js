require('dotenv').config();

// passport package is authentication middleware for Node.js. It can be added to any express-based web application. A comprehensive set of strategies that support authentication using username and password, twitter, facebook and more accounts.
const passport = require('passport');

// Strategy module contains algorithms that are use for specific purpose. In this case authenticating the application using Google API Console project OAuth Client ID Credentials.
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// This configures Passport to use the Google Oauth2.0 authentication strategy.
passport.use(new GoogleStrategy({
	clientID: process.env.clientID,
	clientSecret: process.env.clientSecret,
	callbackURL: "http://localhost:4000/users/google/callback",
	passReqToCallback: true
},
//this is the callback function that will be executed when a user is successfult authenticated
// returns the "profile or information" of the authenticated user: email, firstname, lastname
function (request, accesToken, refreshToken, profile, done){
	return done(null, profile);
})
);

//This function is used to serialize the user object or user information into a session
// In this case, the entire user object is serialized.
// The serialized user object is then stored in the session
passport.serializeUser(function(user,done){
	done(null, user);
})

// This function is used to deserialize the user object from the sessio
passport.deserializeUser(function(user,done){
	done(null, user)
})



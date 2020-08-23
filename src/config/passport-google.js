const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const Cafe = require("../models/Cafe").Cafe;
const bcrypt = require("bcryptjs");
//contains much of the logic for logging in
//should be renamed passport.js

var LocalStrategy = require("passport-local").Strategy;

//function to help in the serialization and desirialisation of cookies
function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup; //User or Cafe
    this.details = details;
}
module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL,
            },
            //callback url = "http://localhost:3000/api/profile/auth/google/callback"
            function(accessToken, refreshToken, profile, done) {
                //callback function called when loggen into user
                //check user table for anyone with a google ID of profile.id
                User.findOne({
                        google_id: profile.id,
                    },
                    function(err, user) {
                        if (err) {
                            return done(err);
                        }
                        console.log(profile);
                        if (!profile._json.hd || !profile._json.hd == "iiti.ac.in") {

                            return done(new Error('Sign in only allowed with iiti domain'));
                        }
                        //No user was found... so create a new user with values from Google (all the profile. stuff)
                        if (!user) {
                            user = new User({
                                name: profile.displayName,
                                google_id: profile.id,
                                role: 'User',

                            });
                            user.save(function(err) {
                                if (err) console.log(err);
                                return done(err, user);
                            });
                        } else {
                            //found user. Return
                            return done(err, user);
                        }
                    }
                );
            }
        )
    );
    passport.use(
        //fot cafe login
        new LocalStrategy({
                usernameField: "email",
                passwordField: "password",
            },
            function(username, password, done) {
                console.log(username, password)
                Cafe.findOne({
                        email_id: username,
                    },
                    function(err, user) {
                        if (err) {
                            //error
                            return done(err);
                        }
                        if (!user) {
                            //user with the email not found
                            console.log('cafe not found');
                            return done(null, false);
                        }
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (isMatch) {
                                //password correct logged in
                                return done(null, user);
                            } else {
                                //password incorrect
                                console.log('password incorrect')
                                return done(null, false);

                            }
                        });
                    }
                );
            }
        )
    );
    // passport.serializeUser(function(userObject, done) {
    //     //adds the userObject currently logged in session to browser cookie
    //     console.log('serialising', userObject)
    //         // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
    //     let userGroup = "";
    //     if (userObject.role == "User") {
    //         userGroup = "User";
    //     } else if (userObject.role === "Cafe") {
    //         userGroup = "Cafe";
    //     }
    //     let sessionConstructor = new SessionConstructor(
    //         userObject.id,
    //         userGroup,
    //         ""
    //     );
    //     done(null, sessionConstructor);
    //     //returns a javascript object with id and usergroup
    // });
    // passport.deserializeUser(function(sessionConstructor, done) {
    //     //finds a session using received cookie
    //     //receives a sessionConstructor object created in the serializer function
    //     console.log('deserializing', sessionConstructor)
    //     if (sessionConstructor.userGroup == "User") {
    //         //user object search in the User model
    //         User.findOne({
    //                 _id: sessionConstructor.userId,
    //             },
    //             function(err, user) {
    //                 // When using string syntax, prefixing a path with - will flag that path as excluded.
    //                 if (err) {
    //                     return done(err);
    //                 }
    //                 done(null, user);
    //             }
    //         );
    //     } else if (sessionConstructor.userGroup == "Cafe") {
    //         //search in the Cafe model
    //         Cafe.findOne({
    //                 _id: sessionConstructor.userId,
    //             },
    //             function(err, user) {
    //                 // When using string syntax, prefixing a path with - will flag that path as excluded.
    //                 if (err) {
    //                     return done(err);
    //                 }
    //                 done(null, user);
    //             }
    //         );
    //     }
    // });
};
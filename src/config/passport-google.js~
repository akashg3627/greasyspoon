const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const Cafe = require("../models/Cafe").Cafe;
const bcrypt = require("bcryptjs");

var LocalStrategy = require("passport-local").Strategy;

function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
}
module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL,
            },
            //callback url = "http://localhost:3000/auth/google/secrets"
            function(accessToken, refreshToken, profile, done) {
                //check user table for anyone with a google ID of profile.id
                User.findOne({
                        google_id: profile.id,
                    },
                    function(err, user) {
                        if (err) {
                            return done(err);
                        }
                        console.log(profile);

                        //No user was found... so create a new user with values from Google (all the profile. stuff)
                        if (!user) {
                            user = new User({
                                name: profile.displayName,
                                google_id: profile.id,
                                role: 'User'
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
                            return done(err);
                        }
                        if (!user) {
                            console.log('cafe not found');
                            return done(null, false);
                        }
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                console.log('password incorrect')
                                return done(null, false);

                            }
                        });
                    }
                );
            }
        )
    );
    passport.serializeUser(function(userObject, done) {
        console.log('serialising', userObject)
            // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
        let userGroup = "";
        if (userObject.role == "User") {
            userGroup = "User";
        } else if (userObject.role === "Cafe") {
            userGroup = "Cafe";
        }
        let sessionConstructor = new SessionConstructor(
            userObject.id,
            userGroup,
            ""
        );
        done(null, sessionConstructor);
    });
    passport.deserializeUser(function(sessionConstructor, done) {
        console.log('deserializing', sessionConstructor)
        if (sessionConstructor.userGroup == "User") {
            User.findOne({
                    _id: sessionConstructor.userId,
                },
                function(err, user) {
                    // When using string syntax, prefixing a path with - will flag that path as excluded.
                    if (err) {
                        return done(err);
                    }
                    done(null, user);
                }
            );
        } else if (sessionConstructor.userGroup == "Cafe") {
            Cafe.findOne({
                    _id: sessionConstructor.userId,
                },
                function(err, user) {
                    // When using string syntax, prefixing a path with - will flag that path as excluded.
                    if (err) {
                        return done(err);
                    }
                    done(null, user);
                }
            );
        }
    });
};
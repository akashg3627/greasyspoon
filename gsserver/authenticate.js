var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var Cafe = require('./models/cafe');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var GoogleStrategy = require('passport-google-oauth20');

var config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey,
        { expiresIn: 3600*24 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.isCafe = (req, res, next) => {
    if (req.user.isCafe) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    }
    else {
        err = new Error('You are not authorised to perform this operation!');
        err.status = 403;
        next(err);
    }
}


exports.googlePassport = passport.use(new GoogleStrategy({
    callbackURL: '/users/googlelogin/redirect',
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({
        googleId: profile.id
    }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else {
            user = new User({ username: profile.displayName });
            user.googleId = profile.id;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    })
}));

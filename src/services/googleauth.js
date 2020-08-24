const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20')
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const User = require('../models/User');
const JWT = require('jsonwebtoken');
const CustomStrategy = require('passport-custom');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['access_token'];
    }
    return token;
  }

var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
      console.log("payload", jwt_payload)
      // Find the user specified in token
      User.findById(jwt_payload.sub)
      .then((err, user) => {
        if (err) {
            return done(err, false);
        }
        else if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
  }));
 
passport.use('googleToken',new GooglePlusTokenStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    User.findOne({google_id: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            console.log('user found')
            return done(null, user);
        }
        else {
            user = new User({
                name: profile.displayName,
                google_id: profile.id,
                role: 'User',
            });
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    })
}));


passport.use('custom',new CustomStrategy((req, done)=>{
  
    User.findOne({ google_id: req.body.googleId }, (err, user) => {
      
        if (err) {
          return done(err, false);
        }
        const email= req.body.email;
  const address= email.split("@");
  const domain= address[1];
  if(domain.localeCompare("iiti.ac.in") !==0)
  {
    const error = new Error("Login with institute id!");
    return done(error, false);
  }
        if (!err && user !== null) {
          return done(null, user);
        }
        else {
          user = new User({ "google_id" : req.body.googleId });
          user.name = req.body.name;
          user.email = req.body.email;
          user.role = 'User';
          user.save((err, user) => {
            if (err)
               return done(err, false);
             else
               return done(null, user);
          })
        }
      })
}))


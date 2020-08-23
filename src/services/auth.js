const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('./googleauth');
const User = require('../models/User')

const UsersController = require('./controller');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/login', passport.authenticate('custom', {session: false}), UsersController.loginuser);

router.post('/oauth', passport.authenticate('googleToken', { scope:["profile"], session: false }), UsersController.googleOAuth);
module.exports = router;



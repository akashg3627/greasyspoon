const JWT = require('jsonwebtoken');
const User = require('../models/User');

const auth = require('./googleauth');
const { signToken } = require('./authService_user');


getToken = function (user) {
  return JWT.sign(user, process.env.JWT_SECRET,
    { expiresIn: 3600 });
};

exports.googleOAuth = (req, res, next) => {
  // Generate token
  const token = signToken(req.user);
  res.cookie('access_token', token, {
    httpOnly: true
  });
  console.log("token", token);
  res.status(200).json({ success: true, token: token, user: req.user });
};


 exports.loginuser = (req, res, next) => {
  if (req.user) {
    var token = getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!', user: req.user});
  }
 }
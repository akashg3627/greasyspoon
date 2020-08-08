const express = require('express');
const router = express.Router();
const _ = require('lodash')
const {
    ensureAuthenticated
} = require('../config/auth');
const bcrypt = require('bcryptjs');
const passport = require('passport');
//User model
const User = require('../models/User');
const {
    Model
} = require('mongoose');
const bodyParser = require('body-parser');
const Cafe = require('../models/Cafe').Cafe;

//Login Page
//register
//REgister handle
router.get('/', ensureAuthenticated, (req, res) => {
    let deepClone = JSON.parse(JSON.stringify(req.user));
    if (req.user.password) {
        delete deepClone.password;
    }
    console.log('the response is', deepClone)
    res.json(deepClone);
});

router.patch('/', ensureAuthenticated, (req, res) => {
    if (req.user.role == 'User') {
        //User object
        User.updateOne({
                _id: req.user._id,
            },
            req.body,
            (err, writeOpResult) => {
                if (err) {
                    console.log(err);
                }
                writeOpResult[userType] = 'User'
                res.json(writeOpResult);
            }
        );

    } else {
        Model.updateOne({
                    _id: req.user.id,
                },
                req.body, (err, writeOpResult) => {
                    if (err) {
                        console.log(err);
                    }
                    writeOpResult[userType] = 'Cafe'
                    res.json(writeOpResult);
                }
            )
            //
    }
})
router.post('/register/cafe/', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(405).json({
            error: 'Please log out first'
        })
    } else {
        console.log('registering Cafe ', req.body);
        var newAcc = new Cafe({
            name: req.body.name,
            email_id: req.body.email,
            ordersCompleted: [],
            ordersPending: [],
            ordersToBeAccepted: [],
            mobNumber: req.body.number,
            role: 'Cafe',
            password: bcrypt.hashSync(req.body.password, 10),
        })
        newAcc.save(err => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json({
                    message: 'Successfully created object'
                });
            }
        })
    }
})
router.get('/check', (req, res) => {
    console.log('checking');
    if (req.user) {
        res.send(req.user);
    } else {
        res.send('not logged in')
    }
})
router.get('/login/user',
    passport.authenticate("google", {
        scope: ["profile", "email"],
    }), (req, res) => {
        console.log('login request');
    })
router.post('/login/cafe', passport.authenticate('local', {
    failureRedirect: '/login/failure'
}), (req, res) => {
    res.status(200).json({
        message: 'Cafe log-in successful'
    })
})
router.get('/auth/google/callback', passport.authenticate('google'), function(req, res) {
    res.send('Successfully logged in using google ')
})
router.get('/logout', (req, res) => {
    console.log('logging out')
    req.logout();
    res.status(200).json({
        message: 'logged out successfully'
    })
})
module.exports = router;
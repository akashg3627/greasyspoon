const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator/check')
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
const upload = require('../config/multer_support');
const cors= require('../cors');

//working api route is /api/profile

//get request to working api sends back the user document currently logged in
//if not logged in sends 401
router.get('/', ensureAuthenticated, (req, res) => {
    let deepClone = JSON.parse(JSON.stringify(req.user));
    if (req.user.password) {
        delete deepClone.password;
    }
    console.log('the response is', deepClone)
    res.json(deepClone);
});
//provides ability to edit user document details.

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
                writeOpResult['userType'] = 'User'
                res.json(writeOpResult);
            }
        );

    } else {
        let deepClone = JSON.parse(JSON.stringify(req.body));
        if (req.body.password) {
            deepClone.password = bcrypt.hashSync(deepClone.password, 10)
        }
        Cafe.updateOne({
                    _id: req.user.id,
                },
                deepClone, (err, writeOpResult) => {
                    if (err) {
                        console.log(err);
                    }
                    writeOpResult['userType'] = 'Cafe'
                    res.json(writeOpResult);
                }
            )
            //
    }
})

//api endpoint to register a cafe using local strategy
//sends 200 if success
//the post request data should(or form names) should have (name,email,number,password)


router.post('/register/cafe/', upload.fields([{
    name: 'logoImage',
    maxCount: 1,
}, {
    name: 'cafeImage',
    maxCount: 1,

}]), (req, res) => {
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
        if (req.files.logoImage !== undefined) {
            newAcc.logoURL = req.files.logoImage[0].path
        }
        if (req.files.cafeImage !== undefined) {
            newAcc.imageURL = req.files.cafeImage[0].path
        }
        newAcc.save(err => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json({
                    message: 'Successfully created object',
                    uploaded: req.files,
                });
            }
        })
    }
})

//checks whether a user(User or Cafe) is logged in or not
router.get('/check', (req, res) => {
        console.log('checking');
        if (req.user) {
            res.status.json({
                user: req.user
            });
        } else {
            res.sendStatus(404);
        }
    })
    //allows User login using google oauth 2 (login only if from iiti domain name)
router.get('/login/user', 
        passport.authenticate("google", {
            scope: ["profile", "email"],
            failureRedirect: '/login/failure'
        }), (req, res) => {

            console.log('login request');
        })
    //login api endpoint for Cafe login
    //redirects to working_route/login/failure if not authenticated
router.post('/login/cafe', passport.authenticate('local', {
        failureRedirect: '/login/failure'
    }), (req, res) => {
        
        res.status(200).json({
            message: 'Cafe log-in successful'
        })
    })
    //callback for google login.
    //do not send direct requests to this endpoint
router.get('/auth/google/callback', function(req, res) {
    if (req.user) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true,  status: 'You are successfully logged in!' });
      }
    })
    //logout route for all user types
router.get('/logout', (req, res) => {
    console.log('logging out')
    req.logout();
    res.status(200).json({
        message: 'logged out successfully'
    })
})
module.exports = router;
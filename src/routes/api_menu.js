const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Menu = require("../models/Menu");
const Dish = require("../models/Dish");
const {
    ensureAuthenticated,
    ensureCafe
} = require("../config/auth");
const {
    Cafe
} = require('../models/Cafe')
    //working api endpoint /api/menu
    //returns list of all cafes
router.get('/', (req, res) => {
    Cafe.find({}, (err, cafes) => {
        if (err) {
            res.status(501).json({
                error: err
            })
        } else {
            cafesCopy = JSON.parse(JSON.stringify(cafes))
            for (let i = 0; i < cafesCopy.length; i++) {
                let workingCafe = cafesCopy[i];
                delete workingCafe.password;
                delete workingCafe.orders;

            }
            res.json(cafesCopy);
        }
    })
});

//working
//returns menu of cafe with cafeid
router.get("/:cafeid", (req, res) => {
    Menu.findOne({
            cafe_id: req.params.cafeid,
        })
        .then((menu) => {
            if (menu) {
                res.json(menu);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => console.log(err));
});


router.post("/", ensureCafe, (req, res) => {
    console.log(req.body);
    console.log(req.user._id);
    Menu.updateOne({
            cafe_id: req.user._id
        }, {
            $push: {
                items: req.body
            }
        },
        (err, result) => {
            if (err) {
                res.json({
                    'error': err
                })
            } else {
                res.send(result);
            }
        })
})




router.delete("/dish/:dishID", ensureCafe, (req, res) => {

    Menu.findOneAndUpdate({
            cafe_id: req.user._id,
        }, {
            $pull: {
                items: {
                    _id: req.params.dishID
                }
            }
        }, {
            new: true
        },
        (err, response) => {
            if (!err) {
                res.status(200).json({
                    status: "deleted",
                    response: response
                });
            } else {
                res.send(err);
            }
        }
    );
});
module.exports = router;
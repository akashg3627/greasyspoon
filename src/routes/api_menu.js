const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Menu = require("../models/Menu");
const Dish = require("../models/Dish");
const {
    ensureAuthenticated,
    ensureCafe
} = require("../config/auth");
const upload = require('../config/multer_support')

const {
    Cafe
} = require('../models/Cafe')
    //working api endpoint /api/menu
    //returns list of all cafes
router.get('/', async(req, res) => {
    try {
        let cafeList = await Cafe.find().select({
            orders: -1,
            password: -1
        }).exec();
        res.status(200).json(cafeList);

    } catch (err) {
        res.status(500).json({
            error: err,
            err: err.message
        })
    }

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
        .catch((err) => console.log(err.message));
});


router.post("/", ensureCafe, upload.single('dishImage'), (req, res) => {
    console.log(req.body);
    let deepClone = JSON.parse(JSON.stringify(req.body));
    if (req.file != undefined) {
        deepClone.pictureURL = req.file.path;
    }
    deepClone.cafe_id = req.user._id;

    console.log(req.user._id);
    Menu.updateOne({
            cafe_id: req.user._id
        }, {
            $push: {
                items: deepClone,
            }
        }, {
            upsert: true
        },
        (err, result) => {
            if (err) {
                res.json({
                    'error': err
                })
            } else {
                res.status(200).json(result);
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
                res.status(500).json({
                    error: 'Unable to delete'
                });
            }
        }
    );
});
module.exports = router;
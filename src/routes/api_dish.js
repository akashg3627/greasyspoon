const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");
// working route situated at /api/dish/
// send post request to the working route with dish schema as specified in /models/Dish.js with forms having same names.
router.post("/", (req, res) => {
    let newDish = new Dish(req.body);
    newDish.save((err) => {
        if (err) {
            res.status(500).json({
                error: 'unable to add dish'
            });
        } else {
            res.status(200).json({
                saved: true,
                object: newDish,
            });
        }
    });
    //get endpoint for getting dish details by id
    router.get("/:dishID", (req, res) => {
        Dish.findById(req.params.dishID), {
                lean: true,
            },
            (err, dish) => {
                if (err) {
                    console.log(err);
                }
                if (dish) {
                    res.json(dish);
                } else {
                    res.sendStatus(404);
                }
            };
    });
    //replace a dish
    router.put("/:dishID", (req, res) => {
        Dish.replaceOne({
                _id: req.params.dishID,
            },
            req.body,
            (err, writeOpResult) => {
                if (err) {
                    console.log(err);
                }
                res.json(writeOpResult);
            }
        );
    });
    //change dish price or name etc.
    router.patch("/:dishID", (req, res) => {
        Dish.updateOne({
                _id: req.params.articleName,
            },
            req.body,
            (err, writeOpResult) => {
                if (err) {
                    console.log(err);
                }
                res.json(writeOpResult);
            }
        );
    });
    //delete a dish
    router.delete("/:dishID", (req, res) => {
        Dish.deleteOne({
                _id: req.params.articleName,
            },
            (err) => {
                if (!err) {
                    res.status(200).json({
                        status: "deleted",
                    });
                } else {
                    res.status(500).json({
                        err: 'unable to delete the dish'
                    });
                }
            }
        );
    });
});
module.exports = router;
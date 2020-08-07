const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");
router.post("/", (req, res) => {
    let newDish = new Dish(req.body);
    newDish.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json({
                saved: true,
                object: newDish,
            });
        }
    });

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
    router.delete("/:dishID", (req, res) => {
        Dish.deleteOne({
                _id: req.params.articleName,
            },
            (err) => {
                if (!err) {
                    res.status(200).json({
                        status: "deleted",
                    });
                }
                res.send(err);
            }
        );
    });
});
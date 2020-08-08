const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Menu = require("../models/Menu");
const Dish = require("../models/Dish");
router.get("/:cafeName", (req, res) => {
    Menu.findOne({
            cafe_name: _.lowerCase(req.params.cafeName),
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
router.post("/:cafeName", (req, res) => {
    let newMenu = new Menu(req.body);
    newMenu.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json({
                message: "Added menu successfully"
            });
        }
    });
});

router.patch("/:cafeName", (req, res) => {
    Menu.updateOne({
            cafe_name: _.lowerCase(req.params.cafeName),
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
router.put("/:cafeName", (req, res) => {
    Menu.replaceOne({
            cafe_name: _.lowerCase(req.params.cafeName),
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

router.delete("/:cafeName", (req, res) => {
    Dish.deleteOne({
            cafe_name: req.params.cafeName,
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
module.exports = router;
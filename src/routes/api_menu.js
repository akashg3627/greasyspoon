const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Menu = require("../models/Menu");
const Dish = require("../models/Dish");
//working api endpoint /api/menu

//returns the menu document by searching for the cafe name
//for more details regarding case sensitivity find lodash lowercase documentation
//_.lowercase(LDFDsJSD-dsaddsJDS) == ldfdsjsd dsaddsjds
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

//post a menu for a particular cafe(only if a menu for the cafe doesn't exist)
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

//edit the menu for the cafe
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
//replace the menu for cafe
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
//delete a menu for a cafe
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
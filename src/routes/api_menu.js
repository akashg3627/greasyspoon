const express = require('express');
const router = express.Router();
const _ = require('lodash')
const Menu = require('../models/Menu');
const Dish = require('../models/Dish');
router.get('/:cafeName', (req, res) => {
    Menu.findOne({
            cafe_name: _.lowerCase(req.params.cafeName)
        })
        .then(menu => {
            if (menu) {
                res.json(menu);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => console.log(err));
});
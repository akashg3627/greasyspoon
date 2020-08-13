const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Cart = require('../models/cart');
const cors = require('./cors');
const Dishes = require('../models/dish');



const cartRouter = express.Router();

cartRouter.use(bodyParser.json());

cartRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Cart.findOne({ userid: req.user._id, isOrder: false })
            .populate('dishes')
            .then((carts) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(carts);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /cart/');
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorite/');
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Cart.deleteOne({ userid: req.user._id, isOrder: false })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

cartRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Cart.findOne({ userid: req.user._id, isOrder: false })
            .then((cart) => {
                if (!cart) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({ "exists": false, "cart": cart });
                }
                else {
                    if (cart.dishes.indexOf(req.params.dishId) < 0) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "exists": false, "cart": cart });
                    }
                    else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "exists": true, "cart": cart });
                    }
                }

            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Cart.findOne({ userid: req.user._id, isOrder: false }, (err, cart) => {
            if (err) return next(err);

            if (!cart) {
                Dishes.findById(req.params.dishId)
                    .then((dish) => {
                        Cart.create({ userid: req.user._id, cafeid: dish.cafeid._id })
                            .then((cart) => {
                                cart.dishes.push({ "_id": req.params.dishId });
                                cart.quantity.push(req.body.quantity);
                                cart.save()
                                    .then((cart) => {
                                        Cart.findById(cart._id)
                                            .populate('dishes')
                                            .then((cart) => {
                                                res.statusCode = 200;
                                                res.setHeader('Content-Type', 'application/json');
                                                res.json(cart);
                                            })
                                    })
                            })
                            .catch((err) => {
                                return next(err);
                            });
                    })
            }
            else {
                cart.dishes.push({ "_id": req.params.dishId });
                cart.quantity.push(req.body.quantity);
                cart.save()
                    .then((cart) => {
                        Cart.findById(cart._id)
                            .populate('dishes')
                            .then((cart) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(cart);
                            })
                    })
                    .catch((err) => {
                        return next(err);
                    })
            }
        })
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Cart.findOne({ userid: req.user._id, isOrder: false }, (err, cart) => {
            if (err) return next(err);
            var i = cart.dishes.indexOf(req.params.dishId);
            cart.quantity[i] = req.body.quantity;
            cart.save()
                .then((cart) => {
                    Cart.findByIdAndUpdate(cart._id, { quantity: cart.quantity }, { new: true })
                        .populate('dishes')
                        .then((cart) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(cart);
                        })
                })
                .catch((err) => {
                    return next(err);
                })
        })
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Cart.findOne({ userid: req.user._id, isOrder: false }, (err, cart) => {
            if (err) return next(err);

            console.log(cart);
            var index = cart.dishes.indexOf(req.params.dishId);
            if (index >= 0) {
                cart.dishes.splice(index, 1);
                cart.save()
                    .then((cart) => {
                        Cart.findById(cart._id)
                            .populate('dishes')
                            .then((cart) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(cart);
                            })
                    })
                    .catch((err) => {
                        return next(err);
                    })
            }
            else {
                err.status = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end('Dish' + req.params.dishId + 'not in your cart');
            }
        })
    });

module.exports = cartRouter;
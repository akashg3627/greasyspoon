const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Cart = require('../models/cart');
const cors = require('./cors');

const orderRouter = express.Router();

orderRouter.use(bodyParser.json());

orderRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        if (req.user.isCafe) {
            Cart.find({ cafeid: req.user._id, isOrder: true })
                .then((cart) => {
                    if (!cart) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ "exists": false });
                        return next();
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(cart);
                }, (err) => next(err))
                .catch((err) => {
                    return next(err);
                })
        }
        else {
            Cart.find({ userid: req.user._id, isOrder: true })
                .then((cart) => {
                    if (!cart) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ "exists": false });
                        return next();
                    }
                    else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(cart);
                    }
                }, (err) => next(err))
                .catch((err) => {
                    return next(err);
                })

        }
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /orders');
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /orders');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /orders');
    });

orderRouter.route('/:cartId')
    .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Cart.findById(req.params.cartId)
            .populate('dishes')
            .then((cart) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cart);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        if (req.user.isCafe) {
            res.statusCode = 403;
            res.end('POST operation not supported on /orders for cafes');
        }
        else {
            Cart.findById(req.params.cartId)
                .then((cart) => {
                        cart.isOrder = true;
                        const tcafeid = cart.dishes[0].cafeid;
                        console.log(tcafeid);
                        cart.save()
                            .then((cart) => {
                                Cart.findById(cart._id)
                                    .populate('dishes')
                                    .then((cart) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json({ "success": true, "cart": cart });
                                    }, (err) => next(err))
                            })
                })
                .catch((err) => {
                    return next(err)
                });
        }
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        if (req.user.isCafe) {
            Cart.findByIdAndUpdate(req.params.cartId, { $set: req.body }, { new: true })
                .then((cart) => {
                    if(cart.cafeid.equals(req.user._id)){
                        Cart.findById(req.params.cartId)
                        .populate('dishes')
                        .then((cart) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({ "isAccepted": cart.isAccepted, "comment": cart.cafecomment, "cart": cart });
                        }, (err) => next(err))
                    }
                    else{
                        res.statusCode = 403;
                        err = new Error('Unaouthorised');
                        return next(err);
                    }
                })
        }
        else {
            res.statusCode = 403;
            res.end('PUT operation not supported on /orders for customer');
        }
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /orders');
    });

module.exports = orderRouter;


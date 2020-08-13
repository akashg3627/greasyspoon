const {
    ensureUser,
    ensureAuthenticated
} = require('../config/auth');
const Dish = require('../models/Dish');
const Cart = require('../models/Cart');
const {
    Order
} = require('../models/Order');
const {
    Cafe
} = require('../models/Cafe');

const router = require('express').Router();

router.post('/', ensureUser, async(req, res) => {
    console.log('order initiated');
    workingCart = await Cart.findOne({
        user_id: req.user._id
    }).lean();
    if (!workingCart) {
        res.status(404).send('no working cart found');
    } else {
        workingCartCopy = JSON.parse(JSON.stringify(workingCart))
        console.log('found cart');
        console.log(workingCartCopy);
        delete workingCartCopy._id;
        console.log('creating order');
        workingOrder = new Order({
            ...workingCartCopy,
            status: 'Yet to be accepted'

        })
        currUser = await User.findOne({
            _id: req.user._id
        })
        currUser.Orders.push(workingOrder);
        currCafe = await Cafe.findOne({
            _id: workingCart.cafe_id
        })
        currCafe.orders.push(workingOrder);
        currUser.save(err => {
            res.send(err)
        });
        currCafe.save(err => {
            res.send(err)
        });
        res.json({
            message: 'success',
            orderStatus: 'pending',
            object: workingOrder
        })
    }
});

router.get('/:user_id/:order_id', ensureAuthenticated, async(req, res) => {
    let workingUser = await User.findOne({
        _id: req.params.user_id
    })
    try {
        workingOrder = workingUser.Orders.id(req.params.order_id);
        res.json({
            order: workingOrder
        });

    } catch (err) {
        res.json({
            error: err
        });
    }
});

module.exports = router;
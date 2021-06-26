const {
    ensureUser,
    ensureAuthenticated
} = require('../config/auth');
const Dish = require('../models/Dish');
const User = require('../models/User')
const {
    Cart
} = require('../models/Cart');
const {
    Order
} = require('../models/Order');
const {
    Cafe
} = require('../models/Cafe');
const router = require('express').Router();
//user name
//cafe name
//
router.post('/', ensureUser, async(req, res) => {
    try {
        console.log('order initiated');
        workingCart = await Cart.findOne({
            user_id: req.user._id
        }).lean();
        if (!workingCart || workingCart.total_price === 0) {
            res.status(404).json({
                error: 'no working cart found'
            });
        } else {
            workingCartCopy = JSON.parse(JSON.stringify(workingCart))
            console.log('found cart');
            console.log(workingCartCopy);
            delete workingCartCopy._id;
            console.log('creating order');

            workingOrder = new Order({
                ...workingCartCopy,
                status: 0,
            })
            currUser = await User.findOne({
                _id: req.user._id
            })
            currUser.orders.splice(0, 0, workingOrder);
            currCafe = await Cafe.findOne({
                _id: workingCart.cafe_id
            })
            currCafe.orders.splice(0, 0, workingOrder);
            currUser.save(err => {
                if (err) {
                    res.status(500).json({
                        error: 'Unable to create order'
                    })
                }
            });
            currCafe.save(err => {
                if (err) {
                    res.status(500).json({
                        error: 'Unable to create order(order saved in user db but not in cafedb'
                    })
                }
            });
            Cart.deleteOne({
                user_id: req.user._id
            }, (err, result) => {
                if (err) res.status(500).json({
                    error: 'Order created but cart unable to delete'
                });
                else {
                    console.log(result);
                }
            })
            res.status(200).json({
                message: 'success',
                orderStatus: 'pending',
                object: workingOrder
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.get('/:user_id/:order_id', ensureAuthenticated, async(req, res) => {

    try {
        let workingUser = await User.findOne({
            _id: req.params.user_id
        })
        workingOrder = workingUser.orders.id(req.params.order_id);
        res.status(workingOrder ? 200 : 404).json({
            order: workingOrder,
            status: workingOrder ? 'found' : 'No order found'
        });

    } catch (err) {
        res.json({
            error: err.message
        });
    }
});

module.exports = router;
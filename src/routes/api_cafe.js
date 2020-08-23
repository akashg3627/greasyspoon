const {
    ensureCafe
} = require('../config/auth');
const {
    Cafe
} = require('../models/Cafe');

const router = require('express').Router();

router.get('/orders', ensureCafe, async(req, res, next) => {

    try {
        let workingCafe = await Cafe.findOne({ _id: req.user._id })
        await res.status(workingCafe ? 200 : 404).json({
            orders: workingCafe.orders ? workingCafe.orders : null
        })
    } catch (err) {
        next(err);
    }

});
router.post('/:orderID/accept', (req, res) => {
    Cafe.findOneAndUpdate({
        _id: req.user._id,
        "orders._id": req.params.orderID,
    }, {
        $set: {
            "orders.$.status": 'Accepted,currently making the order'
        }
    }, {
        new: true
    }, (err, doc) => {
        if (err) {
            res.status(500)
                .json({
                    error: 'Unable to accept.',
                });
        } else {
            workingOrder = doc.orders.id(req.params.orderID);
            User.update({
                    _id: workingOrder.user_id,
                    'orders._id': workingOrder._id
                }, {
                    $set: {
                        "orders.$.status": 'Accepted, currently making the order'
                    }
                })
                .then((err, result) => {
                    if (err) {
                        res.status(501).json('Could not update in user but updated in cafe')
                    } else {
                        res.status(200).json('Accepted the order');
                    };
                })
        }
    })

})
router.get('/:orderID/complete', (req, res) => {
    Cafe.findOneAndUpdate({
        _id: req.user._id,
        "orders._id": req.params.orderID,
    }, {
        $set: {
            "orders.$.status": 'Completed the order, please take the order'
        }
    }, {
        new: true
    }, (err, doc) => {
        if (err) {
            res.status(500)
                .json({
                    error: 'Unable to make the operation.',
                });
        } else {
            workingOrder = doc.orders.id(req.params.orderID);
            User.update({
                    _id: workingOrder.user_id,
                    'orders._id': workingOrder._id
                }, {
                    $set: {
                        "orders.$.status": 'Completed the order, please take the order'
                    }
                })
                .then((err, result) => {
                    if (err) {
                        res.status(501).json('Could not update in user but updated in cafe')
                    } else {
                        res.status(200).json('Operation completed');
                    };
                })
        }
    })

})
router.get('/:orderID/reject', (req, res) => {
    Cafe.findOneAndUpdate({
        _id: req.user._id,
        "orders._id": req.params.orderID,
    }, {
        $set: {
            "orders.$.status": 'Order rejected'
        }
    }, {
        new: true
    }, (err, doc) => {
        if (err) {
            res.status(500)
                .json({
                    error: 'Unable to make the operation.',
                });
        } else {
            workingOrder = doc.orders.id(req.params.orderID);
            User.update({
                    _id: workingOrder.user_id,
                    'orders._id': workingOrder._id
                }, {
                    $set: {
                        "orders.$.status": 'Order rejected'
                    }
                })
                .then((err, result) => {
                    if (err) {
                        res.status(501).json('Could not update in user but updated in cafe')
                    } else {
                        res.status(200).json('Operation completed');
                    };
                })
        }
    })

})
module.exports = router
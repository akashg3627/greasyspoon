const {
    ensureCafe
} = require('../config/auth');
const {
    Cafe
} = require('../models/Cafe');
const User = require('../models/User');

const router = require('express').Router();

router.get('/orders', ensureCafe, async(req, res, next) => {

    try {
        let workingCafe = await Cafe.findOne({
            _id: req.user._id
        })
        await res.status(workingCafe ? 200 : 404).json({
            orders: workingCafe.orders ? workingCafe.orders : null
        })
    } catch (err) {
        next(err);
    }

});
router.post('/:orderID/accept',ensureCafe, (req, res) => {
    Cafe.findOneAndUpdate({
        _id: req.user._id,
        "orders._id": req.params.orderID,
    }, {
        $set: {
            "orders.$.status": 1
        }
    }, {
        new: true
    }, (err, doc) => {
        if (err) {
            res.status(500)
                .json({
                    error: 'Unable to accept.'
                });
        } else {
            workingOrder = doc.orders.id(req.params.orderID);
            User.findOneAndUpdate({
                    _id: workingOrder.user_id,
                    'orders._id': workingOrder._id
                }, {
                    $set: {
                        "orders.$.status": 1
                    }
                })
                .then((err, result) => {
                    if (err) {
                        res.status(501).json({message:'Could not update in user but updated in cafe'});
                    } else {
                        res.status(200).json({message:'Accepted the order'});
                    };
                })
        }
    })

})
router.get('/:orderID/complete',ensureCafe, (req, res) => {
    Cafe.findOneAndUpdate({
        _id: req.user._id,
        "orders._id": req.params.orderID,
    }, {
        $set: {
            "orders.$.status": 2
        }
    }, {
        new: true
    }, (err, doc) => {
        if (err) {
            res.status(500)
                .json({
                    error: 'Unable to make the operation.'
                });
        } else {
            workingOrder = doc.orders.id(req.params.orderID);
            User.findOneAndUpdate({
                    _id: workingOrder.user_id,
                    'orders._id': workingOrder._id
                }, {
                    $set: {
                        "orders.$.status": 2
                    }
                })
                .then((err, result) => {
                    if (err) {
                        res.status(501).json({message:'Could not update in user but updated in cafe'});
                    } else {
                        res.status(200).json({message:'Operation completed'});
                    };
                })
        }
    })
})
router.get('/:orderID/reject',ensureCafe, (req, res) => {
    Cafe.findOneAndUpdate({
        _id: req.user._id,
        "orders._id": req.params.orderID,
    }, {
        $set: {
            "orders.$.status": -1
        }
    }, {
        new: true
    }, (err, doc) => {
        if (err) {
            res.status(500)
                .json({
                    error: 'Unable to make the operation.'
                });
        } else {
            workingOrder = doc.orders.id(req.params.orderID);
            User.findOneAndUpdate({
                    _id: workingOrder.user_id,
                    'orders._id': workingOrder._id
                }, {
                    $set: {
                        "orders.$.status": -1
                    }
                })
                .then((err, result) => {
                    if (err) {
                        res.status(501).json({message:'Could not update in user but updated in cafe'})
                    } else {
                        res.status(200).json({message:'Operation completed'});
                    };
                })
        }
    })

})
module.exports = router
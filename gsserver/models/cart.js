const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
var passportLocalMongoose = require('passport-local-mongoose');
const User = require('./user');
const Dishes = require('./dish')

const cart = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cafeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }],
    quantity: {
        type: [Number]
    },
    amount: {
        type: Currency,
        min: 0
    },
    usercomment: String,
    cafecomment: String,
    isOrder: {
        type: Boolean,
        default: false
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('cart', cart)
module.exports = Cart;
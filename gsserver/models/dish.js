const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
var passportLocalMongoose = require('passport-local-mongoose');
const User = require('./user');

const dishSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: String,
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    cafeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;
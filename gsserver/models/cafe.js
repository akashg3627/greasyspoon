const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const cafeSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cafename: {
        type: String,
        default: ''
    },
    telenum: Number
}, {
    timestamps: true
});

const Cafe = mongoose.model('cafe', cafeSchema);
module.exports = Cafe;
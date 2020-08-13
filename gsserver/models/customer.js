const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const customerSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    telenum: Number
}, {
    timestamps: true
});


const Customer = mongoose.model('customer', customerSchema);
module.exports = Customer;
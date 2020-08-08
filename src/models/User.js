const mongoose = require('mongoose');
const orderSchema = require('./Order').orderSchema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    google_id: String,
    previousOrders: [{
        type: orderSchema,
        immutable: true
    }],
    mobNumber: {
        type: Number,
    },
    role: {
        type: String,
        immutable: true
    },

})
const User = mongoose.model('User', userSchema)
module.exports = User;
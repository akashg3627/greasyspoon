const mongoose = require('mongoose');
const orderSchema = require('./order')
const userSchema = new mongoose.Schema({

    name: String,
    google_id: String,
    previousOrders: orderSchema,
    mobNumber: Number

})
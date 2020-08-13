const mongoose = require("mongoose");
const orderSchema = require("./Order").orderSchema;
const cafeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    orders: [orderSchema],
    mobNumber: {
        type: Number,
    },
    role: {
        type: String,
        immutable: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const Cafe = mongoose.model("Cafe", cafeSchema);
module.exports.Cafe = Cafe;
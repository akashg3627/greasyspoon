const mongoose = require("mongoose");
const orderSchema = require("./Order").orderSchema;
const cafeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email_id: {
        type: String,
        required: true,
        unique: true,
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
    logoURL: String, //to display on list of cafes
    imageURL: String, //to display on the menu page
    description: String,
});
module.exports.Cafe = Cafe = mongoose.model("Cafe", cafeSchema);
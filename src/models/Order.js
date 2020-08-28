const mongoose = require("mongoose");
const {
    dishSchema,
} = require('./Dish')
const {
    cartDishSchema
} = require('./Cart')
const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User'
    },
    cafe_id: {
        type: String,
        required: true,
        ref: 'Cafe'
    },
    user_name: String,
    cafe_name: String,
    dishes: [
        cartDishSchema
    ],
    status: String,
    total_price: Number, //in paisas
    time_placed: {
        type: Date,
        default: Date.now
    }
});
const Order = mongoose.model("Order", orderSchema);
module.exports = {
    orderSchema,
    Order
}
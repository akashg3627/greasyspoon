const mongoose = require("mongoose");
const {
    dishSchema,
} = require('./Dish')
const {
    cartDishSchema
} = require('./Cart')
const orderSchema = new mongoose.Schema({
    user_id: String,
    cafe_id: String,
    dishes: [
        cartDishSchema
    ],
    status: String,
    total_price: Number,
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
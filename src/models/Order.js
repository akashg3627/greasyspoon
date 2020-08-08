const mongoose = require("mongoose");
orderSchema = new mongoose.Schema({
    user_id: String,
    cafe_id: String,
    dish_id: String,
    orderStatus: Boolean,
    orderAccepted: Boolean,
    totalPrice: Number,
});
module.exports.orderSchema = orderSchema
module.exports.Order = new mongoose.model("Order", orderSchema);
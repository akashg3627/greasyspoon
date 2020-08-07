const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user_id: String,
    cafe_id: String,
    dish_id: String,
    orderStatus: bool,
    orderAccepted: bool,
    totalPrice: Number,

})
Order = new mongoose.model('Order', orderSchema)
module.export = {
    orderSchema,
    Order
}
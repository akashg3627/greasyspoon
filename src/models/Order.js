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
    status: Number,//-1 for rejected 
    //0 for nothing 
    //1 for accepted 
    //2 for done
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
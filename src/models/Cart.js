const mongoose = require('mongoose');
const {
    Dish,
    dishSchema,

} = require('./Dish');
const cartDish = Dish.discriminator('cartDish', new mongoose.Schema({
    quantity: {
        type: Number,
        min: 0
    },
    dish_id: String,
}))
const cartDishSchema = cartDish.schema
const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    cafe_id: {
        type: String,
        required: true
    },
    total_price: mongoose.Decimal128,
    dishes: [
        cartDishSchema
    ],
})
let Cart = mongoose.model('Cart', cartSchema)
module.exports = {
    Cart,
    cartSchema,
    cartDishSchema,
    cartDish
}
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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cafe_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cafe'
    },
    total_price: Number, //in paisas
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
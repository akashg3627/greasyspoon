const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const dishSchema = new mongoose.Schema({

    dish_name: String,
    price: Currency,
    availability: bool,
    totalRating: Number,
    ratingCount: Number,
    pictureURL: String
})
const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish
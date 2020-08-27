const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

const dishSchema = new mongoose.Schema({
    dish_name: String,
    cafe_id: {
        type: String,
        required: true,
        ref: 'Cafe'
    },
    price: {
        type: Number
    },
    availability: Boolean,
    category: String,
    featured: Boolean,
    pictureURL: String,
    description: String,
}, {
    discriminatorKey: 'kind'
});
const Dish = mongoose.model("Dish", dishSchema);

module.exports = {
    dishSchema,
    Dish,
};
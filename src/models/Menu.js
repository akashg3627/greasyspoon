const dishImport = require("./Dish");
const dishSchema = dishImport.dishSchema;
const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
    cafe_id: {
        type: String,
        required: true,
        ref: 'Cafe',
        unique: true,
        dropDups: true,
    },
    items: [dishSchema],
});
const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
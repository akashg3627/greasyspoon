const dishImport = require("./Dish");
const dishSchema = dishImport.dishSchema;
const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
    cafe_name: String,
    cafe_id: {
        type: String,
        unique: true,
        dropDups: true
    },
    items: [dishSchema],
});
const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
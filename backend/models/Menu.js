const dishImport = require('./Dish')
const dishSchema = dishImport.dishSchema
const menuSchema = new mongoose.Schema({
    cafe_name: String,
    items: [dishSchema]

})
const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu;
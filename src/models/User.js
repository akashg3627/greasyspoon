const mongoose = require("mongoose");
const { orderSchema } = require("./Order");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        immutable: true,
    },
    google_id: { type: String, immutable: true },
    orders: [orderSchema],
    mobNumber: {
        type: Number,
        //required:true
    },
    role: {
        type: String,
        immutable: true,
    },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
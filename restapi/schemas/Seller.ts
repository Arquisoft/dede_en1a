const mongoose = require("mongoose")

const seller = new mongoose.Schema({
    id: {type: mongoose.ObjectId, required: true, unique: true},
    name: String,
    products: [] // Later on it will contain ProductModel elements.
})

module.exports = mongoose.model("Seller", seller)





import {ObjectId} from "mongodb";
import mongoose from "mongoose";
import {Schema, Types} from "mongoose";
// Temporal
const ProductSchema = new Schema({});

const sellerSchema = new Schema({
    id: {type: ObjectId, required: true},
    products: []
})

export let Seller = mongoose.model("Seller", sellerSchema)
// Temporal schema, will be deleted after the products are done.
export const ProductModel = mongoose.model("Product", ProductSchema);




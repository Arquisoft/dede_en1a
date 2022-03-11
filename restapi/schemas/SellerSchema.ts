import {Schema} from "mongoose";
import mongoose from "mongoose";
import ISeller from "../interfaces/SellerInterface";
import ProductSchema from "./ProductSchema";

const sellerSchema = new Schema({
    name: {type: String, required: true},
    products: [{type: Schema.Types.ObjectId, ref: "Product"}]
})

export default mongoose.model<ISeller>("Seller", sellerSchema)
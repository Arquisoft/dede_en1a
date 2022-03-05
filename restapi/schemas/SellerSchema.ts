import IProduct from "../interfaces/ProductInterface";
import {Schema} from "mongoose";
import mongoose from "mongoose";
import ISeller from "../interfaces/SellerInterface";
import ProductSchema from "./ProductSchema";


const sellerSchema = new mongoose.Schema<ISeller>({
    name: {type: String, required: true},
    products: {type: Array(), "default": []}
})

export default mongoose.model<ISeller>("Seller", sellerSchema)





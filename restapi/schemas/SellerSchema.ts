import IProduct from "../interfaces/ProductInterface";
import mongoose from "mongoose";
import ISeller from "../interfaces/SellerInterface";
import ProductSchema from "./ProductSchema";

const sellerSchema = new mongoose.Schema<ISeller>({
    name: String,
    products: [ProductSchema]
})

export default mongoose.model<ISeller>("Seller", sellerSchema)





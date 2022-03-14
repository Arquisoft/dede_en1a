import mongoose from "mongoose";
import ISeller from "../interfaces/SellerInterface";



const sellerSchema = new mongoose.Schema<ISeller>({
    name: {type: String, required: true},
    products: {type: Array(), "default": []}
})

export default mongoose.model<ISeller>("Seller", sellerSchema)





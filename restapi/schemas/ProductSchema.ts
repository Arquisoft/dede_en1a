import mongoose from "mongoose";
import IProduct from "../interfaces/ProductInterface";

const productSchema = new mongoose.Schema<IProduct>({
    // Temporal
})

export default mongoose.model<IProduct>("Product", productSchema)





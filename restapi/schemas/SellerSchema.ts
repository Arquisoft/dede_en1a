import {Schema} from "mongoose";
import mongoose from "mongoose";
import ISeller from "../interfaces/SellerInterface";


const sellerSchema = new Schema({
    name: {type: String, required: true},
	// TODO: maybe move this to product and hevce seller id in product back referencing
    products: [{type: Schema.Types.ObjectId, ref: "Product"}]
})

export default mongoose.model<ISeller>("Seller", sellerSchema)
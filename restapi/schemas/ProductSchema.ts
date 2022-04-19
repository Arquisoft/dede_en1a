import mongoose, {Schema} from "mongoose";
import IProduct from "../interfaces/ProductInterface";

const productSchema = new Schema<IProduct>({
		name: {type: String, required: true},
		price: {type: Number, required: true},
		description: {type: String, required: false},
		image: {type: String, required: false},
		seller_id: {type: Schema.Types.ObjectId, required: true}
});

export default mongoose.model<IProduct>("Product", productSchema);
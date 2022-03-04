import mongoose, {Schema} from "mongoose";
import IProduct from "../interfaces/ProductInterface";

const ObjectId  = mongoose.Types.ObjectId;

const productSchema = new Schema(
	{
		name: {type: String, required: true},
		price: {type: Number, required: true},
		description: {type: String, required: false},
		image: {type: String, required: false},
		// not sure if we need this
		weight: {type: Number, required: false}
	}
)

export default mongoose.model<IProduct>("Product", productSchema);

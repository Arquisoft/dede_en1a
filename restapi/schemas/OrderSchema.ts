import mongoose, {Schema} from "mongoose";
import IOrder from "../interfaces/OrderInterface";

const ObjectId  = Schema.Types.ObjectId;
const Map  = Schema.Types.Map;

const orderSchema = new Schema (
	{
		webId: {type: String, required: true},
		name: String,
		address: {type: String, required: true},
		shipping: {type: Number, required: true },
		totalPrice: {type: Number, required: true },
		products: {type: Map, of: Number, required: true}
		
	}
);


export default mongoose.model<IOrder>("Order", orderSchema);

import mongoose, {Schema} from "mongoose";
import IOrder from "../interfaces/OrderInterface";

const orderSchema = new Schema (
    {
        webId: {type: String, required: true},
        address: {type: String, required: true},
		name: {type: String, required: false },
        shippingPrice: {type: Number, required: true},
        totalPrice: {type: Number, required: true},
        products: [{
            "product": Schema.Types.ObjectId, "amount": Number
        }]
    }, {
		timestamps: true
	}
);


export default mongoose.model<IOrder>("Order", orderSchema);

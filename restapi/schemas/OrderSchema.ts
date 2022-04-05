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
<<<<<<< HEAD
            product: String, 
			amount: Number
=======
            "prod": String, "amount": Number
>>>>>>> 49420779c0d7343065c6160c93105001b1567ce5
        }]
    }, {
		timestamps: true
	}
);


export default mongoose.model<IOrder>("Order", orderSchema);

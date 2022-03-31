import mongoose, {Schema} from "mongoose";
import IOrder from "../interfaces/OrderInterface";

const ObjectId  = Schema.Types.ObjectId;
const Map  = Schema.Types.Map;

const orderSchema = new Schema (
    {
        webId: {type: String, required: true},
        address: String,
        shipping: Number,
        totalPrice: Number,
        products: {type: Map, of: Number}
        
    }
);


export default mongoose.model<IOrder>("Order", orderSchema);

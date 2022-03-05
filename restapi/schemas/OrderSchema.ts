import mongoose, {Schema} from "mongoose";
import IOrder from "../interfaces/OrderInterface";
import IProduct from "../interfaces/ProductInterface";

const ObjectId  = Schema.Types.ObjectId;
const Map  = Schema.Types.Map;

const orderSchema = new Schema (
    {
        userId: {type: ObjectId, required: true},
        products: {type: Map, of: Number}
    }
);

export default mongoose.model<IOrder>("Order", orderSchema);

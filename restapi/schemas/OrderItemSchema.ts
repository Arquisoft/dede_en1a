import mongoose, {Schema} from "mongoose";
import IOrderItem from "../interfaces/OrderItemInterface";

const orderItemSchema = new Schema(
    {
        product: {type: Schema.Types.ObjectId, ref: "Product"},
        number: {type: Number, required: true}
    }
)
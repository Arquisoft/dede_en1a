import { Document } from "mongoose";
import IOrderItem from "./OrderItemInterface";

export default interface IOrder extends Document {
    webId: string
    address: string
	name: string
    shippingPrice: number
    totalPrice: number
    products: Array<IOrderItem>
}
import { ObjectId } from "mongoose";
import { Document } from "mongoose";

export default interface IOrder extends Document {
    webId: string
    address: string
	name: string
    shippingPrice: number
    totalPrice: number
    products: [{
		product_id : ObjectId, 
		number : number
	}]
}
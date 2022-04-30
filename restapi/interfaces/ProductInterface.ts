import { Document } from "mongoose";

export default interface IProduct extends Document {
	name: String,
	price: Number,
	description?: String,
	image?: String,
	seller_id: String
}